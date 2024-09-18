import { DotsVerticalIcon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons'

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components'
import { addCpfMask } from '@/utils/masks/masks'

import type { ResponseEmployee } from '@/api/employees/employees.types'
import type { EmployeesDataProps } from '../employees.types'

interface EmployeesDataTableProps extends EmployeesDataProps {
  isLoading: boolean
  employees: ResponseEmployee[] | null
}

export function EmployeesDataTable({
  employees,
  isLoading,
  setDeleteDialog,
  setEmployeeDialog,
}: EmployeesDataTableProps) {
  return (
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
  )
}
