import dayjs from 'dayjs'

import { DotsVerticalIcon } from '@radix-ui/react-icons'
import {
  Button,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenu,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Skeleton,
  Badge,
  DropdownMenuItem,
  BadgeProps,
} from '@/components'
import { useIsMobile } from '@/hooks'
import { cn } from '@/utils'

import EmptySearchSVG from '@/assets/svgs/empty-search.svg'

import { useAllocationsTable } from './useAllocationsTable'
import { AllocationStatus } from '@/api/allocations/allocations.types'

export function AllocationsTable() {
  const { isMobile } = useIsMobile()
  const { allocations, isLoading, handleReturnAllocation } =
    useAllocationsTable()

  if (!allocations?.length) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
        <img
          src={EmptySearchSVG}
          alt="Nenhum funcionário encontrado"
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
          <TableHead className="max-w-[100px]">Qtd.</TableHead>
          <TableHead>Equipamento alocado</TableHead>
          <TableHead>Funcionário</TableHead>
          <TableHead>Data de alocação</TableHead>
          <TableHead>Data prevista de devolução</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {allocations?.map(allocations => {
          var statusText = 'Alocado'
          var statusVariant: BadgeProps['variant'] = 'success' as const

          // get only the date part of the date
          const startDate = dayjs(allocations.startDate).format('YYYY-MM-DD')
          const endDate = allocations.endDate
            ? dayjs(allocations.endDate).format('YYYY-MM-DD')
            : ''

          if (dayjs(endDate).isSame(dayjs().format('YYYY-MM-DD'))) {
            statusText = 'Vence hoje'
            statusVariant = 'warning' as const
          } else if (dayjs(endDate).isBefore(dayjs(startDate))) {
            statusText = 'Atrasado'
            statusVariant = 'destructive' as const
          }

          if (allocations.status === AllocationStatus.RETURNED) {
            statusText = 'Devolvido'
            statusVariant = 'secondary' as const
          }

          return (
            <TableRow key={allocations.id}>
              <TableCell>{allocations.allocatedQuantity}</TableCell>
              <TableCell>{allocations.equipment.name}</TableCell>
              <TableCell>{allocations.employee.name}</TableCell>
              <TableCell>
                {dayjs(allocations.startDate).format('DD/MM/YYYY')}
              </TableCell>
              <TableCell>
                {allocations.endDate
                  ? dayjs(allocations.endDate).format('DD/MM/YYYY')
                  : '-'}
              </TableCell>
              <TableCell>
                <Badge
                  variant={statusVariant}
                  className="ml-2 w-24 justify-center">
                  {statusText}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <DotsVerticalIcon className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {allocations.status === AllocationStatus.ALLOCATED && (
                      <DropdownMenuItem
                        onClick={() => handleReturnAllocation(allocations.id)}>
                        Devolver equipamento
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          )
        })}
        {isLoading &&
          Array.from({ length: 2 }).map((_, index) => (
            <TableRow key={index}>
              {Array.from({ length: 7 }).map((_, index) => (
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
