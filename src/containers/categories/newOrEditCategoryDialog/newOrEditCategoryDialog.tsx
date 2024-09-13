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
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
} from '@/components'
import { useNewOrEditCategoryDialog } from './useNewOrEditCategoryDialog'
import type { NewCategoryDialogProps } from '../categories.types'

export function NewOrEditCategoryDialog(props: NewCategoryDialogProps) {
  const { form, isLoading, handleClose, onSubmit } =
    useNewOrEditCategoryDialog(props)

  return (
    <Dialog open={props.open}>
      <Form {...form}>
        <DialogContent onClose={handleClose}>
          <DialogHeader className="text-left">
            <DialogTitle>
              {props.data?.id ? 'Editar categoria' : 'Nova categoria'}
            </DialogTitle>
            <DialogDescription>
              {props.data?.id
                ? 'Preencha os campos abaixo para editar a categoria selecionada.'
                : 'Preencha os campos abaixo para adicionar uma nova categoria.'}
            </DialogDescription>
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel required>Nome</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nome da categoria"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Descrição da categoria"
                        disabled={isLoading}
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
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
                ? 'Atualizar categoria'
                : 'Adicionar nova categoria'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Form>
    </Dialog>
  )
}
