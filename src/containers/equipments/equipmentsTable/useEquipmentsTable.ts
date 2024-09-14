import { fetchEquipments } from '@/api/equipments/equipments'
import { useQuery } from '@/hooks'

export function useEquipmentsTable() {
  const { data, isLoading } = useQuery({
    queryKey: ['equipments'],
    queryFn: async () => {
      const res = await fetchEquipments()
      return res.data
    },
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  })

  return {
    equipments: data?.equipments,
    isLoading,
  }
}
