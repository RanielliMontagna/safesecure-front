import { useState } from 'react'

import { deleteEmployee } from '@/api/employees/employees'
import { toast } from '@/hooks'

import type { DeleteEmployeeDialogProps } from '../employees.types'
import { queryClient } from '@/lib/react-query'
import { useAppStore } from '@/store/app/app'

export function useDeleteEmployeeDialog({
  data,
  onClose,
}: DeleteEmployeeDialogProps) {
  const { handleError } = useAppStore()

  const [isLoading, setLoading] = useState(false)

  async function onSubmit() {
    try {
      setLoading(true)

      if (!data?.id) {
        throw new Error('Ocorreu um erro ao tentar deletar o funcionário')
      }

      await deleteEmployee(data.id)

      toast({
        title: 'Funcionário removido com sucesso!',
        description: `O funcionário "${data.name}" foi removido com sucesso.`,
        variant: 'success',
      })

      queryClient.invalidateQueries('employees')
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
