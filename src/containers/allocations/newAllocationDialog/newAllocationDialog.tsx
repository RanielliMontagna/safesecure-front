import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import { ExclamationTriangleIcon, ReloadIcon } from '@radix-ui/react-icons'

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
  CustomDatePicker,
  Alert,
  AlertDescription,
} from '@/components'

import type { NewAllocationDialogProps } from '../allocations.types'
import { useNewAllocationDialog } from './useNewAllocationDialog'

export function NewAllocationDialog(props: NewAllocationDialogProps) {
  const navigate = useNavigate()

  const {
    equipmentsSelectOptions,
    employeeSelectOptions,
    isLoading,
    form,
    onSubmit,
    handleClose,
  } = useNewAllocationDialog(props)

  return (
    <Dialog open={props.open}>
      <Form {...form}>
        <DialogContent onClose={handleClose}>
          <DialogHeader className="text-left">
            <DialogTitle>Criar nova alocação</DialogTitle>
            <DialogDescription>
              Preencha os campos abaixo para criar uma nova alocação.
            </DialogDescription>
            <div className="grid gap-2">
              <CustomSelect
                control={form.control}
                name="employeeId"
                label="Funcionário"
                placeholder="Selecione um funcionário"
                options={employeeSelectOptions}
                required
                disabled={!employeeSelectOptions}
              />
              {!employeeSelectOptions && (
                <Alert variant="destructive" className="flex items-center p-2">
                  <ExclamationTriangleIcon className="min-w-4 min-h-4 " />
                  <AlertDescription>
                    Nenhum funcionário encontrado, para criar uma alocação é
                    necessário ter ao menos um equipamento cadastrado.{' '}
                    <b className="cursor-pointer">
                      <a onClick={() => navigate('/funcionarios?novo=true')}>
                        Clique aqui para criar um funcionário.
                      </a>
                    </b>
                  </AlertDescription>
                </Alert>
              )}
              <CustomSelect
                control={form.control}
                name="equipmentId"
                label="Equipamento"
                placeholder="Selecione um equipamento"
                options={equipmentsSelectOptions?.map(
                  ({ label, value, availableQuantity }) => ({
                    label: (
                      <div>
                        {label}
                        <span className="text-muted-foreground">
                          {availableQuantity
                            ? ` (${availableQuantity} disponível(s))`
                            : ' (indisponível)'}
                        </span>
                      </div>
                    ),
                    value,
                  }),
                )}
                required
                disabled={!equipmentsSelectOptions}
              />
              {!equipmentsSelectOptions && (
                <Alert variant="destructive" className="flex items-center p-2">
                  <ExclamationTriangleIcon className="min-w-4 min-h-4 " />
                  <AlertDescription>
                    Nenhum equipamento encontrado, para criar uma alocação é
                    necessário ter ao menos um equipamento cadastrado.{' '}
                    <b className="cursor-pointer">
                      <a onClick={() => navigate('/equipamentos?novo=true')}>
                        Clique aqui para criar um equipamento.
                      </a>
                    </b>
                  </AlertDescription>
                </Alert>
              )}
              <CustomDatePicker
                control={form.control}
                name="startDate"
                label="Data de início"
                required
                disabled
                helperText="A data de início é definida automaticamente."
              />
              <CustomDatePicker
                control={form.control}
                name="endDate"
                label="Data de término"
                fromDate={dayjs(form.getValues('startDate')).toDate()}
              />
              <CustomInput
                control={form.control}
                name="allocatedQuantity"
                label="Quantidade alocada"
                mask="number"
                placeholder="Digite a quantidade alocada"
                helperText="Caso não seja informado, será considerado 1."
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
              Criar alocação
            </Button>
          </DialogFooter>
        </DialogContent>
      </Form>
    </Dialog>
  )
}
