import {
  Cross1Icon,
  DotsVerticalIcon,
  MagnifyingGlassIcon,
  Pencil2Icon,
  TrashIcon,
} from '@radix-ui/react-icons'

import {
  Button,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Skeleton,
  EmptyState,
  Form,
  CustomInput,
} from '@/components'
import { useIsMobile } from '@/hooks'
import { cn } from '@/utils'
import { addCpfMask } from '@/utils/masks/masks'

import { useEmployeesTable } from './useEmployeesTable'
import type { EmployeesTableProps } from '../employees.types'

export function EmployeesTable({
  setEmployeeDialog,
  setDeleteDialog,
}: EmployeesTableProps) {
  const { isMobile } = useIsMobile()
  const { form, employees, isLoading } = useEmployeesTable()

  if (employees === null) {
    return (
      <EmptyState
        title="Nenhum funcionário cadastrado"
        message={`Crie um novo funcionário clicando no botão ${
          isMobile ? 'abaixo' : 'no canto superior direito'
        }.`}
      />
    )
  }

  return (
    <Form {...form}>
      <div
        className={cn(
          'flex items-center justify-between w-full pb-4',
          isMobile && 'flex-col items-start gap-2',
        )}>
        <div className="flex items-center gap-1">
          <h2 className="text-sm font-semibold flex gap-1">
            Funcionários{' '}
            <p className="text-sm text-gray-500">
              ({String(employees?.length)})
            </p>
          </h2>
        </div>
        <div className="max-sm:w-full">
          <CustomInput
            control={form.control}
            startAdornment={
              <MagnifyingGlassIcon className="w-4 h-4 text-muted-foreground" />
            }
            endAdornment={
              form.watch('search') && (
                <button
                  className="absolute p-1.5 hover:bg-gray-50 rounded-md right-2 bg-gray-100"
                  onClick={() => form.setValue('search', '')}>
                  <Cross1Icon className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              )
            }
            name="search"
            placeholder="Buscar funcionário"
          />
        </div>
      </div>
      {employees?.length === 0 && (
        <EmptyState
          title="Nenhum funcionário encontrado"
          message="Tente buscar por outro nome ou cpf ou criar um novo funcionário."
          className="h-[calc(100%-4rem)]"
        />
      )}
      {employees && employees?.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>CPF</TableHead>
              <TableHead>Matrícula</TableHead>
              <TableHead>Setor</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees?.map(employee => (
              <TableRow key={employee.id}>
                <TableCell className="truncate">{employee.name}</TableCell>
                <TableCell className="truncate">
                  {addCpfMask(employee.cpf)}
                </TableCell>
                <TableCell>{employee.registration}</TableCell>
                <TableCell>{employee.sector}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <DotsVerticalIcon className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() =>
                          setEmployeeDialog({
                            open: true,
                            data: {
                              id: employee.id,
                              name: employee.name,
                              cpf: employee.cpf,
                              registration: employee.registration.toString(),
                              sector: employee.sector,
                            },
                          })
                        }>
                        <Pencil2Icon className="w-4 h-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setDeleteDialog({
                            open: true,
                            data: {
                              id: employee.id,
                              name: employee.name,
                              cpf: employee.cpf,
                              registration: employee.registration.toString(),
                              sector: employee.sector,
                            },
                          })
                        }}>
                        <TrashIcon className="w-4 h-4 mr-2" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {isLoading &&
              Array.from({ length: 2 }).map((_, index) => (
                <TableRow key={index}>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <TableCell key={index}>
                      <Skeleton className="w-full h-8" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}
    </Form>
  )
}
