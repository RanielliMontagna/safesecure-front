import { useForm } from 'react-hook-form'
import { z } from 'zod'

import type { FetchEmployeesParams } from '@/api/employees/employees.types'
import { fetchEmployees } from '@/api/employees/employees'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDebounce, useQuery } from '@/hooks'
import { useEffect } from 'react'

const formSchema = z.object({ search: z.string().optional() })

export function useEmployeesTable() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { search: '' },
  })

  const searchValue = form.watch('search')

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      const params = {} as FetchEmployeesParams
      if (searchValue) params.search = searchValue

      const res = await fetchEmployees(params)
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
    isLoading,
    employees: data?.employees,
  }
}
