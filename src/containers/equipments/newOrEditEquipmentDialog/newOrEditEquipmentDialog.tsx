import { useNavigate } from 'react-router-dom'
import { ReloadIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons'

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
  CustomSelect,
  Alert,
  AlertDescription,
} from '@/components'
import { useNewOrEditEquipmentDialog } from './useNewOrEditEquipmentDialog'
import type { NewEquipmentDialogProps } from '../equipments.types'

export function NewOrEditEquipmentDialog(props: NewEquipmentDialogProps) {
  const navigate = useNavigate()
  const { form, isLoading, categoriesSelectOptions, handleClose, onSubmit } =
    useNewOrEditEquipmentDialog(props)

  return (
    <Dialog open={props.open}>
      <Form {...form}>
        <DialogContent onClose={handleClose}>
          <DialogHeader className="text-left">
            <DialogTitle>
              {props.data?.id ? 'Editar equipamento' : 'Novo equipamento'}
            </DialogTitle>
            <DialogDescription>
              {props.data?.id
                ? 'Preencha os campos abaixo para editar o equipamento selecionado.'
                : 'Preencha os campos abaixo para adicionar um novo equipamento.'}
            </DialogDescription>
            <div className="grid gap-2">
              <CustomInput
                control={form.control}
                name="code"
                label="Código"
                placeholder="123456"
                mask="number"
                maxLength={6}
                required
              />
              <CustomInput
                control={form.control}
                name="name"
                label="Nome"
                placeholder="Luva emborrachada"
                required
              />
              <CustomSelect
                control={form.control}
                name="categoryId"
                label="Categoria"
                placeholder="Selecione uma categoria"
                options={categoriesSelectOptions}
                required
              />
              {categoriesSelectOptions?.length === 0 && (
                <Alert variant="destructive" className="flex items-center p-2">
                  <ExclamationTriangleIcon className="min-w-4 min-h-4 " />
                  <AlertDescription>
                    Nenhuma categoria encontrada, para adicionar ou editar um
                    equipamento, é necessário criar uma categoria.{' '}
                    <b className="cursor-pointer">
                      <a onClick={() => navigate('/categorias?new=true')}>
                        Clique aqui para criar uma categoria.
                      </a>
                    </b>
                  </AlertDescription>
                </Alert>
              )}
              <CustomInput
                control={form.control}
                name="quantity"
                label="Quantidade"
                placeholder="10"
                mask="number"
                maxLength={6}
                helperText="Caso não seja informado, a quantidade será considerada como 1."
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
                ? 'Atualizar equipamento'
                : 'Adicionar novo equipamento'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Form>
    </Dialog>
  )
}
