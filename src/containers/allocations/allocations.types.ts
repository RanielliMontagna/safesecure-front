import dayjs from 'dayjs'
import { z } from 'zod'

export const formSchema = z
  .object({
    employeeId: z.string().min(1, 'Selecione um funcionário'),
    equipmentId: z.string().min(1, 'Selecione um equipamento'),
    startDate: z.coerce.string().min(1, 'Selecione uma data de início'),
    endDate: z.coerce.string(),
    allocatedQuantity: z.string().optional(),
  })
  .refine(
    data => {
      const startDate = dayjs(data.startDate).format('YYYY-MM-DD')
      const endDate = dayjs(data.endDate).format('YYYY-MM-DD')
      const endDateIsBeforeStartDate = dayjs(endDate).isBefore(startDate)

      if (data.endDate && endDateIsBeforeStartDate) return false
      return true
    },
    {
      message: 'Data de término deve ser posterior à data de início',
      path: ['endDate'],
    },
  )

export interface AllocationDialogState {
  open: boolean
}

export interface NewAllocationDialogProps extends AllocationDialogState {
  onClose: () => void
}
