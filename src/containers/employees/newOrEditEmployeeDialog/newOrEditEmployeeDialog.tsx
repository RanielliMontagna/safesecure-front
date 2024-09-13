import { ReloadIcon } from '@radix-ui/react-icons'

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Form,
  CustomInput,
} from '@/components'
import { useNewOrEditEmployeeDialog } from './useNewOrEditEmployeeDialog'
import type { NewEmployeeDialogProps } from '../employees.types'

export function NewOrEditEmployeeDialog(props: NewEmployeeDialogProps) {
  const { form, isLoading, handleClose, onSubmit } =
    useNewOrEditEmployeeDialog(props)

  return (
    <Dialog open={props.open}>
      <Form {...form}>
        <DialogContent onClose={handleClose}>
          <DialogHeader className="text-left">
            <DialogTitle>
              {props.data?.id ? 'Editar funcionário' : 'Novo funcionário'}
            </DialogTitle>
            <DialogDescription>
              {props.data?.id
                ? 'Preencha os campos abaixo para editar o funcionário selecionado.'
                : 'Preencha os campos abaixo para adicionar um novo funcionário.'}
            </DialogDescription>
            <div className="grid gap-2">
              <CustomInput
                control={form.control}
                name="name"
                label="Nome"
                placeholder="Fulano de Tal"
                required
              />
              <CustomInput
                control={form.control}
                name="cpf"
                label="CPF"
                placeholder="000.000.000-00"
                mask="cpf"
                required
              />
              <CustomInput
                control={form.control}
                name="registration"
                label="Matrícula"
                placeholder="764"
                mask="number"
                maxLength={6}
                required
              />
              <CustomInput
                control={form.control}
                name="sector"
                label="Setor"
                placeholder="Manutenção, Recursos Humanos, etc."
                required
              />
            </div>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <DialogClose onClick={handleClose} disabled={isLoading} asChild>
              <Button variant="secondary">Voltar</Button>
            </DialogClose>
            <Button disabled={isLoading} onClick={onSubmit}>
              {isLoading && (
                <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />
              )}
              {props.data?.id
                ? 'Atualizar funcionário'
                : 'Adicionar nova funcionário'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Form>
    </Dialog>
  )
}
