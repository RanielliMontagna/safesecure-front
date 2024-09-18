import type { ResponseEmployee } from '@/api/employees/employees.types'
import type { EmployeesDataProps } from '../employees.types'
import {
  Skeleton,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Button,
  Card,
} from '@/components'

import { DotsVerticalIcon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons'
import { addCpfMask } from '@/utils/masks/masks'

interface EmployeesDataListProps extends EmployeesDataProps {
  isLoading: boolean
  employees: ResponseEmployee[] | null
}

export function EmployeesDataList({
  employees,
  isLoading,
  setEmployeeDialog,
  setDeleteDialog,
}: EmployeesDataListProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-2">
        <Skeleton className="w-full h-8" />
        <Skeleton className="w-full h-8" />
        <Skeleton className="w-full h-8" />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {employees?.map(employee => (
        <Card
          key={employee.id}
          className="flex items-center justify-between p-4 ">
          <div>
            <h5 className="text-sm font-semibold mb-1">
              <span>{employee.registration}</span> - {employee.name}
            </h5>
            <p className="text-xs text-gray-500">
              <b>CPF:</b> {addCpfMask(employee.cpf)}
            </p>
            <p className="text-xs text-gray-500">
              <b>Setor:</b> {employee.sector}
            </p>
          </div>
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
        </Card>
      ))}
    </div>
  )
}
