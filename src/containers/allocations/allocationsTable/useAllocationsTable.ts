import {
  fetchAllocations,
  returnAllocation,
} from '@/api/allocations/allocations'
import { toast, useQuery } from '@/hooks'
import { queryClient } from '@/lib/react-query'
import { useAppStore } from '@/store/app/app'

export function useAllocationsTable() {
  const { setLoading, handleError } = useAppStore()

  const { data, isLoading } = useQuery({
    queryKey: ['allocations'],
    queryFn: async () => {
      const res = await fetchAllocations()
      return res.data
    },
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  })

  async function handleReturnAllocation(allocationId: string) {
    try {
      setLoading(true)

      const { data } = await returnAllocation(allocationId)

      toast({
        title: `Devolução realizada com sucesso!`,
        description: `A devolução de ${data.equipment.name} foi realizada com sucesso.`,
        variant: 'success',
      })

      queryClient.invalidateQueries('allocations')
      queryClient.invalidateQueries('equipments')
    } catch (error) {
      handleError(error)
    } finally {
      setLoading(false)
    }
  }

  return {
    isLoading,
    allocations: data?.allocations,
    handleReturnAllocation,
  }
}
