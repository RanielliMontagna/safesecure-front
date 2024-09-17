import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { fetchCategories } from '@/api/categories/categories'
import { useQuery } from '@/hooks/useQuery/useQuery'
import { FetchCategoriesParams } from '@/api/categories/categories.types'
import { useDebounce } from '@/hooks'

const formSchema = z.object({ search: z.string().optional() })

export function useCategoriesTable() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { search: '' },
  })

  const searchValue = form.watch('search')

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const params = {} as FetchCategoriesParams
      if (searchValue) params.search = searchValue

      const res = await fetchCategories(params)
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
    isLoading: isLoading || isFetching,
    categories: data?.categories,
  }
}
