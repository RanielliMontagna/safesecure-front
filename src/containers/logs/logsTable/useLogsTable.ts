import { fetchLogs } from '@/api/logs/logs'
import { useQuery } from '@/hooks/useQuery/useQuery'

export function useLogsTable() {
  const { data, isLoading } = useQuery({
    queryKey: ['logs'],
    queryFn: async () => {
      const res = await fetchLogs()
      return res.data
    },
    staleTime: 0, // Disable cache
  })

  return { logs: data?.logs, isLoading }
}
