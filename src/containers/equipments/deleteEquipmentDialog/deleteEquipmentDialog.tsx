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

import type { DeleteEquipmentDialogProps } from '../equipments.types'
import { useDeleteEquipmentDialog } from './useDeleteEquipmentDialog'

export function DeleteEquipmentDialog(props: DeleteEquipmentDialogProps) {
  const { isLoading, onSubmit } = useDeleteEquipmentDialog(props)

  return (
    <AlertDialog open={props.open}>
      <AlertDialogContent>
        <AlertDialogHeader className="text-left">
          <AlertDialogTitle>
            Deletar equipamento <b>{props.data?.name}</b>?
          </AlertDialogTitle>
          <AlertDialogDescription className="max-w-md">
            Tem certeza que deseja deletar o equipamento{' '}
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
              Deletar equipamento
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
