import { z } from 'zod'

export const formSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(3, 'O nome deve conter no mínimo 3 caracteres')
    .max(100, 'O nome deve conter no máximo 100 caracteres'),
  cpf: z
    .string()
    .min(11, 'O CPF deve conter 11 dígitos')
    .max(11, 'O CPF deve conter 11 dígitos'),
  registration: z
    .string()
    .min(1, 'A matrícula deve ser um número de 1 a 6 dígitos')
    .max(6, 'A matrícula não pode ser maior que 999999')
    .regex(/^[0-9]+$/, 'O campo matrícula deve conter apenas números'),
  sector: z
    .string()
    .min(3, 'O setor deve conter no mínimo 3 caracteres')
    .max(100, 'O setor deve conter no máximo 100 caracteres'),
})

export interface EmployeeDialogState {
  open: boolean
  data?: z.infer<typeof formSchema> | null
}

export interface NewEmployeeDialogProps extends EmployeeDialogState {
  onClose: () => void
}

export interface DeleteEmployeeDialogProps extends EmployeeDialogState {
  onClose: () => void
}

export interface EmployeesDataProps {
  setEmployeeDialog: React.Dispatch<React.SetStateAction<EmployeeDialogState>>
  setDeleteDialog: React.Dispatch<React.SetStateAction<EmployeeDialogState>>
}
