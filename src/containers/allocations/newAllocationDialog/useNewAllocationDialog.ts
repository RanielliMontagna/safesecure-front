import { useState } from 'react'
import { useForm } from 'react-hook-form'
import dayjs from 'dayjs'

import { z } from '@/lib/zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { fetchEmployees } from '@/api/employees/employees'
import { fetchEquipments } from '@/api/equipments/equipments'
import { createAllocation } from '@/api/allocations/allocations'

import { toast, useQuery } from '@/hooks'
import { useAppStore } from '@/store/app/app'
import { queryClient } from '@/lib/react-query'

import { formSchema, type NewAllocationDialogProps } from '../allocations.types'

export function useNewAllocationDialog({ onClose }: NewAllocationDialogProps) {
  const { handleError } = useAppStore()
  const [isLoading, setLoading] = useState(false)

  const employeesQuery = useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      const res = await fetchEmployees()
      return res.data
    },
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  })

  const equipmentsQuery = useQuery({
    queryKey: ['equipments'],
    queryFn: async () => {
      const res = await fetchEquipments()
      return res.data
    },
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employeeId: '',
      equipmentId: '',
      startDate: dayjs().format('YYYY-MM-DD').toString(),
      endDate: '',
      allocatedQuantity: '',
    },
  })

  function handleClose() {
    onClose()
    form.reset()
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true)

      const { data } = await createAllocation({
        employeeId: values.employeeId,
        equipmentId: values.equipmentId,
        startDate: new Date(values.startDate),
        endDate: values.endDate ? new Date(values.endDate) : undefined,
        allocatedQuantity: Number(values.allocatedQuantity || 1),
      })

      toast({
        title: 'Nova alocação criada!',
        description: `Alocação de ${data.allocatedQuantity} ${
          data.allocatedQuantity > 1 ? 'equipamentos' : 'equipamento'
        } para ${data.employee.name} criada com sucesso.`,
        variant: 'success',
      })

      queryClient.invalidateQueries('allocations')
      queryClient.invalidateQueries('equipments')
      onClose()
    } catch (err) {
      handleError(err)
    } finally {
      setLoading(false)
    }
  }

  return {
    form,
    isLoading,
    employeeSelectOptions: employeesQuery.data?.employees.map(e => ({
      value: e.id,
      label: e.name,
    })),
    equipmentsSelectOptions: equipmentsQuery.data?.equipments.map(e => ({
      value: e.id,
      label: e.name,
      availableQuantity: e.available_quantity,
    })),
    handleClose,
    onSubmit: form.handleSubmit(onSubmit),
  }
}
