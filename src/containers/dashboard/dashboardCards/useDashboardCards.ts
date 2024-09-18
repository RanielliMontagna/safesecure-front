import { getDashboardInfos } from '@/api/allocations/allocations'
import { useQuery } from 'react-query'

export function useDashboardCards() {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['dashboardInfos'],
    queryFn: async () => {
      const res = await getDashboardInfos()
      return res.data
    },
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  })

  return {
    data,
    isLoading: isLoading || isFetching,
  }
}
