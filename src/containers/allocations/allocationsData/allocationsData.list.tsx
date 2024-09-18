import { DotsVerticalIcon } from '@radix-ui/react-icons'

import {
  Skeleton,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Button,
  Card,
  Badge,
  BadgeProps,
} from '@/components'

import {
  AllocationStatus,
  type ResponseAllocation,
} from '@/api/allocations/allocations.types'
import dayjs from 'dayjs'

interface AllocationsDataListProps {
  isLoading: boolean
  allocations: ResponseAllocation[] | null
  handleReturnAllocation: (allocationId: string) => void
}

export function AllocationsDataList({
  allocations,
  isLoading,
  handleReturnAllocation,
}: AllocationsDataListProps) {
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
          <Card
            key={allocation.id}
            className="flex items-center justify-between p-4">
            <div className="flex flex-col w-full">
              <div className="flex justify-between w-full flex-wrap-reverse gap-2 mb-1">
                <h5 className="text-sm font-semibold mb-1">
                  {allocation.allocatedQuantity}x {allocation.equipment.name}
                </h5>
                <Badge variant={statusVariant} className="w-24 justify-center">
                  {statusText}
                </Badge>
              </div>
              <p className="text-xs text-gray-500">
                <b>Alocado para:</b> {allocation.employee.name}
              </p>
              <p className="text-xs text-gray-500">
                <b>Data de alocação:</b>{' '}
                {dayjs(allocation.startDate).format('DD/MM/YYYY')}
              </p>
              <p className="text-xs text-gray-500">
                <b>Prazo de devolução:</b>{' '}
                {allocation.endDate
                  ? dayjs(allocation.endDate).format('DD/MM/YYYY')
                  : '-'}
              </p>
            </div>

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
          </Card>
        )
      })}
    </div>
  )
}
