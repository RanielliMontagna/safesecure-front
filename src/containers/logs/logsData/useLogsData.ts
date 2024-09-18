import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { fetchLogs } from '@/api/logs/logs'
import { FetchLogsParams } from '@/api/logs/logs.types'

import { useQuery } from '@/hooks/useQuery/useQuery'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDebounce } from '@/hooks'

const formSchema = z.object({ search: z.string().optional() })

export function useLogsData() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { search: '' },
  })

  const searchValue = form.watch('search')

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['logs'],
    queryFn: async () => {
      const params = {} as FetchLogsParams
      if (searchValue) params.search = searchValue

      const res = await fetchLogs(params)
      return res.data
    },
    staleTime: 0, // Disable cache
  })

  const debouncedSearch = useDebounce(searchValue || '', 500)

  useEffect(() => {
    refetch()
  }, [debouncedSearch])

  return { form, logs: data?.logs, isLoading }
}
