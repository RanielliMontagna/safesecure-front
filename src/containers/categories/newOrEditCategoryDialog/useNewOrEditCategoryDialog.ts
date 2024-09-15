import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { z } from '@/lib/zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { createCategory, updateCategory } from '@/api/categories/categories'
import { useAppStore } from '@/store/app/app'
import { toast } from '@/hooks'
import { queryClient } from '@/lib/react-query'

import { formSchema, NewCategoryDialogProps } from '../categories.types'

export function useNewOrEditCategoryDialog({
  data,
  onClose,
}: NewCategoryDialogProps) {
  const { handleError } = useAppStore()
  const [isLoading, setLoading] = useState(false)

  const defaultValues = { name: '', description: '' }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  function handleClose() {
    onClose()
    form.reset()
  }

  async function handleCreateCategory(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true)

      await createCategory(values)

      toast({
        title: 'Categoria criada com sucesso!',
        description: `A categoria "${values.name}" foi criada com sucesso.`,
        variant: 'success',
      })

      queryClient.invalidateQueries('categories')
      form.reset(defaultValues)
      onClose()
    } catch (err) {
      handleError(err)
    } finally {
      setLoading(false)
    }
  }

  async function handleEditCategory(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true)

      await updateCategory(values.id!, {
        name: values.name,
        description: values.description,
      })

      toast({
        title: 'Categoria atualizada com sucesso!',
        description: `A categoria "${values.name}" foi atualizada com sucesso.`,
        variant: 'success',
      })

      queryClient.invalidateQueries('categories')
      form.reset(defaultValues)
      onClose()
    } catch (err) {
      handleError(err)
    } finally {
      setLoading(false)
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (data?.id) {
      handleEditCategory(values)
    } else {
      handleCreateCategory(values)
    }
  }

  useEffect(() => {
    if (data) {
      form.reset(data)
    } else {
      form.reset(defaultValues)
    }
  }, [data])

  return {
    form,
    isLoading,
    handleClose,
    onSubmit: form.handleSubmit(onSubmit),
  }
}
