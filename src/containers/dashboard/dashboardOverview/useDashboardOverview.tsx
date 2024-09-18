import { getAllocationsByWeek } from '@/api/allocations/allocations'
import { useQuery } from 'react-query'

export function useDashboardOverview() {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['weekAllocations'],
    queryFn: async () => {
      const res = await getAllocationsByWeek()
      return res.data
    },
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  })

  return {
    data,
    isLoading: isLoading || isFetching,
  }
}
