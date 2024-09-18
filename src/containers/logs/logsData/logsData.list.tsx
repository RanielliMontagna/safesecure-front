import dayjs from 'dayjs'

import {
  LogActions,
  LogActionsTranslated,
  type ResponseLog,
} from '@/api/logs/logs.types'

import { Skeleton, Card, Badge } from '@/components'
import { cn } from '@/utils'

interface LogsDataListProps {
  isLoading: boolean
  logs: ResponseLog[] | null
}

export function LogsDataList({ logs, isLoading }: LogsDataListProps) {
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
      {logs?.map(log => {
        const action = LogActionsTranslated[log.action as LogActions]

        return (
          <Card
            key={log.id}
            className="flex items-center justify-between p-4 gap-1">
            <div>
              <p className="text-xs text-gray-500">
                {dayjs(log.createdAt).format(
                  'D [de] MMMM [de] YYYY [às] HH:mm',
                )}
              </p>
              <h3 className="text-sm">{log.details}</h3>
            </div>
            <div>
              <Badge
                className={cn(
                  'w-24 flex justify-center',
                  log.action === LogActions.CREATE &&
                    'bg-green-500 hover:bg-green-600',
                  log.action === LogActions.UPDATE &&
                    'bg-blue-500 hover:bg-blue-600',
                  log.action === LogActions.DELETE &&
                    'bg-red-500 hover:bg-red-600',
                )}>
                {action}
              </Badge>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
