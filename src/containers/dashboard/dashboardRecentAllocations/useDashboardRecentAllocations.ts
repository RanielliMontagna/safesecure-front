import { fetchLatestAllocations } from '@/api/allocations/allocations'
import { useQuery } from 'react-query'

export function useDashboardRecentAllocations() {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['recentAllocations'],
    queryFn: async () => {
      const res = await fetchLatestAllocations()
      return res.data
    },
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  })

  return {
    data,
    isLoading: isLoading || isFetching,
  }
}
