import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { z } from '@/lib/zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { createEmployee, updateEmployee } from '@/api/employees/employees'
import { useAppStore } from '@/store/app/app'
import { toast } from '@/hooks'
import { queryClient } from '@/lib/react-query'

import { formSchema, NewEmployeeDialogProps } from '../employees.types'

export function useNewOrEditEmployeeDialog({
  data,
  onClose,
}: NewEmployeeDialogProps) {
  const { handleError } = useAppStore()
  const [isLoading, setLoading] = useState(false)

  const defaultValues = { name: '', cpf: '', registration: '', sector: '' }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  function handleClose() {
    onClose()
    form.reset()
  }

  async function handleCreateEmployee(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true)

      await createEmployee({
        name: values.name,
        cpf: values.cpf,
        sector: values.sector,
        registration: Number(values.registration),
      })

      toast({
        title: 'Funcionário criado com sucesso!',
        description: `O funcionário "${values.name}" foi criado com sucesso.`,
        variant: 'success',
      })

      queryClient.invalidateQueries('employees')
      form.reset(defaultValues)
      onClose()
    } catch (err) {
      handleError(err)
    } finally {
      setLoading(false)
    }
  }

  async function handleEditEmployee(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true)

      await updateEmployee(values.id!, {
        name: values.name,
        cpf: values.cpf,
        sector: values.sector,
        registration: Number(values.registration),
      })

      toast({
        title: 'Funcionário atualizado com sucesso!',
        description: `O funcionário "${values.name}" foi atualizado com sucesso.`,
        variant: 'success',
      })

      queryClient.invalidateQueries('employees')
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
      handleEditEmployee(values)
    } else {
      handleCreateEmployee(values)
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
