import { ReloadIcon } from '@radix-ui/react-icons'

import {
  Button,
  AlertDialog,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogCancel,
} from '@/components'

import type { DeleteEmployeeDialogProps } from '../employees.types'
import { useDeleteEmployeeDialog } from './useDeleteEmployeeDialog'

export function DeleteEmployeeDialog(props: DeleteEmployeeDialogProps) {
  const { isLoading, onSubmit } = useDeleteEmployeeDialog(props)

  return (
    <AlertDialog open={props.open}>
      <AlertDialogContent>
        <AlertDialogHeader className="text-left">
          <AlertDialogTitle>
            Deletar funcionário <b>{props.data?.name}</b>?
          </AlertDialogTitle>
          <AlertDialogDescription className="max-w-md">
            Tem certeza que deseja deletar o funcionário{' '}
            <b>{props.data?.name}</b>? Essa ação não poderá ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2">
          <AlertDialogAction asChild>
            <Button
              disabled={isLoading}
              onClick={onSubmit}
              variant="destructive">
              {isLoading && (
                <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />
              )}
              Deletar funcionário
            </Button>
          </AlertDialogAction>
          <AlertDialogCancel
            onClick={props.onClose}
            disabled={isLoading}
            asChild>
            <Button variant="secondary">Cancelar</Button>
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
