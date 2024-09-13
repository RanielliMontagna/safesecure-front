import { fetchCategories } from '@/api/categories/categories'
import { useQuery } from '@/hooks/useQuery/useQuery'

export function useCategoriesTable() {
  const { data, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await fetchCategories()
      return res.data
    },
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  })

  return {
    categories: data?.categories,
    isLoading,
  }
}
