import { fetchEmployees } from '@/api/employees/employees'
import { useQuery } from '@/hooks/useQuery/useQuery'

export function useEmployeesTable() {
  const { data, isLoading } = useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      const res = await fetchEmployees()
      return res.data
    },
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  })

  return {
    employees: data?.employees,
    isLoading,
  }
}
