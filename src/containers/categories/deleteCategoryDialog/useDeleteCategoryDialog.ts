import { useState } from 'react'

import { deleteCategory } from '@/api/categories/categories'
import { toast } from '@/hooks'

import type { DeleteCategoryDialogProps } from '../categories.types'
import { queryClient } from '@/lib/react-query'
import { useAppStore } from '@/store/app/app'

export function useDeleteCategoryDialog({
  data,
  onClose,
}: DeleteCategoryDialogProps) {
  const { handleError } = useAppStore()

  const [isLoading, setLoading] = useState(false)

  async function onSubmit() {
    try {
      setLoading(true)

      if (!data?.id) {
        throw new Error('Ocorreu um erro ao tentar deletar a categoria')
      }

      await deleteCategory(data.id)

      toast({
        title: 'Categoria removida com sucesso!',
        description: `A categoria "${data.name}" foi removida com sucesso.`,
        variant: 'success',
      })

      queryClient.invalidateQueries('categories')
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
