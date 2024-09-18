import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

import { useDashboardRecentAllocations } from './useDashboardRecentAllocations'
import { Skeleton } from '@/components'

import ConstructionHat from '@/assets/svgs/construction-hat.svg'

export function DashboardRecentAllocations() {
  const { data, isLoading } = useDashboardRecentAllocations()

  if (isLoading) {
    return (
      <div className="space-y-8">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-center w-full gap-4">
            <div className="ml-4 space-y-1 w-full">
              <Skeleton className="max-md:w-[80%] w-[55%] h-4" />
              <Skeleton className="max-md:w-[70%] w-[45%] h-3" />
            </div>
            <div className="ml-auto font-medium">
              <Skeleton className="w-24 h-4" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (!data?.allocations?.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[20rem]">
        <img
          src={ConstructionHat}
          alt="Nenhuma alocação recente"
          className="w-40 h-40"
        />
        <p className="mt-2 text-lg font-medium">Nenhuma alocação recente</p>
        <p className="mt-1 max-w-[25rem] text-sm text-muted-foreground text-center">
          Ainda não há alocações registradas, ao começar a alocar equipamentos
          eles aparecerão aqui.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {data?.allocations?.map(allocation => (
        <div className="flex items-center" key={allocation.id}>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {allocation.equipment.name}{' '}
              <span className="text-muted-foreground">
                - {allocation.allocatedQuantity} un
              </span>
            </p>
            <p className="text-sm text-muted-foreground">
              Alocado para{' '}
              <span className="font-medium">{allocation.employee.name}</span>
            </p>
          </div>
          <div className="ml-auto font-medium">
            <p className="text-sm text-right">
              {dayjs(allocation.startDate).fromNow()}
            </p>
          </div>
        </div>
      ))}
      <div className="flex items-center">
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">
            Luvas de proteção{' '}
            <span className="text-muted-foreground">- 5 un</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Alocado para <span className="font-medium">João</span>
          </p>
        </div>
        <div className="ml-auto font-medium">
          <p className="text-sm text-right">Há 2 horas</p>
        </div>
      </div>
    </div>
  )
}
