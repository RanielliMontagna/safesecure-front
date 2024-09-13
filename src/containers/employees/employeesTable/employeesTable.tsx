import { DotsVerticalIcon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons'

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
} from '@/components'
import { useIsMobile } from '@/hooks'
import { cn } from '@/utils'

import { useEmployeesTable } from './useEmployeesTable'
import type { EmployeesTableProps } from '../employees.types'

import EmptySearchSVG from '@/assets/svgs/empty-search.svg'
import { addCpfMask } from '@/components/customInput/masks/masks'

export function EmployeesTable({
  setEmployeeDialog,
  setDeleteDialog,
}: EmployeesTableProps) {
  const { isMobile } = useIsMobile()
  const { employees, isLoading } = useEmployeesTable()

  if (!employees?.length) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
        <img
          src={EmptySearchSVG}
          alt="Nenhuma categoria encontrada"
          className={cn('w-1/4 h-auto mb-4', isMobile && 'w-1/2')}
        />
        <h2 className={cn('text-2xl font-semibold', isMobile && 'text-xl')}>
          Nenhum funcionário encontrado
        </h2>
        <p className={cn('text-gray-500', isMobile && 'text-sm')}>
          Crie um novo funcionário clicando no botão{' '}
          {isMobile ? 'abaixo' : 'no canto superior direito'}.
        </p>
      </div>
    )
  }

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
              <TableCell>
                <Skeleton className="w-full h-8" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-full h-8" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="w-full h-8" />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}
