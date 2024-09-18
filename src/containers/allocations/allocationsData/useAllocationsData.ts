import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  fetchAllocations,
  returnAllocation,
} from '@/api/allocations/allocations'
import { queryClient } from '@/lib/react-query'
import { useAppStore } from '@/store/app/app'

import { useDebounce, useQuery, toast } from '@/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import type { FetchAllocationsParams } from '@/api/allocations/allocations.types'

const formSchema = z.object({ search: z.string().optional() })

export function useAllocationsTable() {
  const { setLoading, handleError } = useAppStore()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { search: '' },
  })

  const searchValue = form.watch('search')

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['allocations'],
    queryFn: async () => {
      const params = {} as FetchAllocationsParams
      if (searchValue) params.search = searchValue

      const res = await fetchAllocations(params)
      return res.data
    },
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  })

  async function handleReturnAllocation(allocationId: string) {
    try {
      setLoading(true)

      const { data } = await returnAllocation(allocationId)

      toast({
        title: `Devolução realizada com sucesso!`,
        description: `A devolução de ${data.equipment.name} foi realizada com sucesso.`,
        variant: 'success',
      })

      queryClient.invalidateQueries('allocations')
      queryClient.invalidateQueries('equipments')
    } catch (error) {
      handleError(error)
    } finally {
      setLoading(false)
    }
  }

  const debouncedSearch = useDebounce(searchValue || '', 500)

  useEffect(() => {
    refetch()
  }, [debouncedSearch])

  return {
    form,
    isLoading,
    allocations: data?.allocations,
    handleReturnAllocation,
  }
}
