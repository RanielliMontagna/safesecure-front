import dayjs from 'dayjs'
import { DotsVerticalIcon } from '@radix-ui/react-icons'

import {
  Badge,
  BadgeProps,
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
import {
  AllocationStatus,
  ResponseAllocation,
} from '@/api/allocations/allocations.types'

interface AllocationsDataTableProps {
  isLoading: boolean
  allocations: ResponseAllocation[] | null
  handleReturnAllocation: (allocationId: string) => void
}

export function AllocationsDataTable({
  isLoading,
  allocations,
  handleReturnAllocation,
}: AllocationsDataTableProps) {
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
        {allocations?.map(allocation => {
          var statusText = 'Alocado'
          var statusVariant: BadgeProps['variant'] = 'success' as const

          const startDate = dayjs(allocation.startDate).format('YYYY-MM-DD')
          const endDate = allocation.endDate
            ? dayjs(allocation.endDate).format('YYYY-MM-DD')
            : ''

          if (dayjs(endDate).isSame(dayjs().format('YYYY-MM-DD'))) {
            statusText = 'Vence hoje'
            statusVariant = 'warning' as const
          } else if (dayjs(endDate).isBefore(dayjs(startDate))) {
            statusText = 'Atrasado'
            statusVariant = 'destructive' as const
          }

          if (allocation.status === AllocationStatus.RETURNED) {
            statusText = 'Devolvido'
            statusVariant = 'secondary' as const
          }

          return (
            <TableRow key={allocation.id}>
              <TableCell>{allocation.allocatedQuantity}</TableCell>
              <TableCell>{allocation.equipment.name}</TableCell>
              <TableCell>{allocation.employee.name}</TableCell>
              <TableCell>
                {dayjs(allocation.startDate).format('DD/MM/YYYY')}
              </TableCell>
              <TableCell>
                {allocation.endDate
                  ? dayjs(allocation.endDate).format('DD/MM/YYYY')
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
                    {allocation.status === AllocationStatus.ALLOCATED && (
                      <DropdownMenuItem
                        onClick={() => handleReturnAllocation(allocation.id)}>
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
