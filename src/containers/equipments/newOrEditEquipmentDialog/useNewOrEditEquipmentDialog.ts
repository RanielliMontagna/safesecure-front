import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { z } from '@/lib/zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { createEquipment, updateEquipment } from '@/api/equipments/equipments'
import { useAppStore } from '@/store/app/app'
import { toast, useQuery } from '@/hooks'
import { queryClient } from '@/lib/react-query'
import { fetchCategories } from '@/api/categories/categories'

import { formSchema, NewEquipmentDialogProps } from '../equipments.types'

export function useNewOrEditEquipmentDialog({
  data,
  onClose,
}: NewEquipmentDialogProps) {
  const { handleError } = useAppStore()
  const [isLoading, setLoading] = useState(false)

  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await fetchCategories()
      return res.data
    },
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  })

  const defaultValues = { name: '', cpf: '', registration: '', sector: '' }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  function handleClose() {
    onClose()
    form.reset()
  }

  async function handleCreateEquipment(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true)

      await createEquipment({
        code: Number(values.code),
        name: values.name,
        categoryId: values.categoryId,
        quantity: Number(values.quantity),
      })

      toast({
        title: 'Equipamento criado com sucesso!',
        description: `O equipamento "${values.name}" foi criado com sucesso.`,
        variant: 'success',
      })

      queryClient.invalidateQueries('equipments')
      form.reset(defaultValues)
      onClose()
    } catch (err) {
      handleError(err)
    } finally {
      setLoading(false)
    }
  }

  async function handleEditEquipment(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true)

      await updateEquipment(values.id!, {
        code: Number(values.code),
        name: values.name,
        categoryId: values.categoryId,
        quantity: Number(values.quantity),
      })

      toast({
        title: 'Equipamento atualizado com sucesso!',
        description: `O equipamento "${values.name}" foi atualizado com sucesso.`,
        variant: 'success',
      })

      queryClient.invalidateQueries('equipments')
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
      handleEditEquipment(values)
    } else {
      handleCreateEquipment(values)
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
    categoriesSelectOptions: categoriesQuery.data?.categories.map(category => ({
      value: category.id,
      label: category.name,
    })),
    handleClose,
    onSubmit: form.handleSubmit(onSubmit),
  }
}
