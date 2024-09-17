import dayjs from 'dayjs'

import {
  Cross1Icon,
  DotsVerticalIcon,
  MagnifyingGlassIcon,
} from '@radix-ui/react-icons'
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
  EmptyState,
  Form,
  CustomInput,
} from '@/components'
import { useIsMobile } from '@/hooks'
import { cn } from '@/utils'

import { useAllocationsTable } from './useAllocationsTable'
import { AllocationStatus } from '@/api/allocations/allocations.types'

export function AllocationsTable() {
  const { isMobile } = useIsMobile()
  const { form, allocations, isLoading, handleReturnAllocation } =
    useAllocationsTable()

  if (allocations === null) {
    return (
      <EmptyState
        title="Nenhuma alocação encontrada"
        message={`Para criar uma nova alocação clique no botão ${
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
            Alocações{' '}
            <p className="text-sm text-gray-500">
              ({String(allocations?.length)})
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
            placeholder="Buscar alocação"
          />
        </div>
      </div>
      {allocations?.length === 0 && (
        <EmptyState
          title="Nenhuma alocação encontrada"
          message="Não foi possível encontrar nenhuma alocação com os filtros aplicados, tente novamente com outros filtros ou crie uma nova alocação."
          className="h-[calc(100%-4rem)]"
        />
      )}
      {allocations && allocations?.length > 0 && (
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

              const startDate = dayjs(allocations.startDate).format(
                'YYYY-MM-DD',
              )
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
                            onClick={() =>
                              handleReturnAllocation(allocations.id)
                            }>
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
      )}
    </Form>
  )
}
