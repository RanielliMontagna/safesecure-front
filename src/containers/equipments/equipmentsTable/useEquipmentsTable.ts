import { useEffect } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'

import { fetchEquipments } from '@/api/equipments/equipments'
import { FetchEquipmentsParams } from '@/api/equipments/equipments.types'

import { useDebounce, useQuery } from '@/hooks'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({ search: z.string().optional() })

export function useEquipmentsTable() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { search: '' },
  })

  const searchValue = form.watch('search')

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['equipments'],
    queryFn: async () => {
      const params = {} as FetchEquipmentsParams
      if (searchValue) params.search = searchValue

      const res = await fetchEquipments(params)
      return res.data
    },
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  })

  const debouncedSearch = useDebounce(searchValue || '', 500)

  useEffect(() => {
    refetch()
  }, [debouncedSearch])

  return {
    form,
    equipments: data?.equipments,
    isLoading,
  }
}
