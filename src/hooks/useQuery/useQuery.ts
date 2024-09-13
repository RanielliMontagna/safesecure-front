import { useEffect } from 'react'
import { useQuery as useReactQuery, UseQueryOptions } from 'react-query'

import { useAppStore } from '@/store/app/app'

interface IUseQueryOptions<TData> extends UseQueryOptions<TData> {}

export function useQuery<TData>(options: IUseQueryOptions<TData>) {
  const { handleError } = useAppStore()

  const values = useReactQuery({
    retry: 1, // Number of retries
    refetchOnWindowFocus: false, // Prevents refetching on tab change
    refetchInterval: 1000 * 60 * 5, // 5 minutes interval
    ...options,
  })

  useEffect(() => {
    if (values.error) {
      handleError(values.error)
    }
  }, [values.error])

  return { ...values, data: values?.data }
}
