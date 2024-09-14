import { useState } from 'react'

import { deleteEquipment } from '@/api/equipments/equipments'
import { toast } from '@/hooks'

import type { DeleteEquipmentDialogProps } from '../equipments.types'
import { queryClient } from '@/lib/react-query'
import { useAppStore } from '@/store/app/app'

export function useDeleteEquipmentDialog({
  data,
  onClose,
}: DeleteEquipmentDialogProps) {
  const { handleError } = useAppStore()

  const [isLoading, setLoading] = useState(false)

  async function onSubmit() {
    try {
      setLoading(true)

      if (!data?.id) {
        throw new Error('Ocorreu um erro ao tentar deletar o equipamento.')
      }

      await deleteEquipment(data.id)

      toast({
        title: 'Equipamento removido com sucesso!',
        description: `O equipamento "${data.name}" foi removido com sucesso.`,
        variant: 'success',
      })

      queryClient.invalidateQueries('equipments')
      onClose()
    } catch (err) {
      handleError(err)
    } finally {
      setLoading(false)
    }
  }

  return {
    isLoading,
    onSubmit,
  }
}
