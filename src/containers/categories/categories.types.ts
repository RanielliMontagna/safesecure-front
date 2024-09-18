import { z } from 'zod'

export const formSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3).max(100),
  description: z.string().optional(),
})

export interface CategoryDialogState {
  open: boolean
  data?: z.infer<typeof formSchema> | null
}

export interface NewCategoryDialogProps extends CategoryDialogState {
  onClose: () => void
}

export interface DeleteCategoryDialogProps extends CategoryDialogState {
  onClose: () => void
}

export interface CategoriesDataProps {
  setCategoryDialog: React.Dispatch<React.SetStateAction<CategoryDialogState>>
  setDeleteDialog: React.Dispatch<React.SetStateAction<CategoryDialogState>>
}
