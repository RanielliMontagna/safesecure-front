import { z } from 'zod'

export const formSchema = z.object({
  id: z.string().optional(),
  code: z
    .string()
    .min(1, 'O código deve ser um número de 1 a 6 dígitos')
    .max(6, 'O código não pode ser maior que 999999')
    .regex(/^[0-9]+$/, 'O campo código deve conter apenas números'),
  name: z
    .string()
    .min(3, 'O nome deve conter no mínimo 3 caracteres')
    .max(100, 'O nome deve conter no máximo 100 caracteres'),
  categoryId: z.string().min(1, 'A categoria deve ser selecionada'),
  quantity: z.string().optional(),
})

export interface EquipmentDialogState {
  open: boolean
  data?: z.infer<typeof formSchema> | null
}

export interface NewEquipmentDialogProps extends EquipmentDialogState {
  onClose: () => void
}

export interface DeleteEquipmentDialogProps extends EquipmentDialogState {
  onClose: () => void
}

export interface EquipmentsTableProps {
  setEquipmentDialog: React.Dispatch<React.SetStateAction<EquipmentDialogState>>
  setDeleteDialog: React.Dispatch<React.SetStateAction<EquipmentDialogState>>
}
