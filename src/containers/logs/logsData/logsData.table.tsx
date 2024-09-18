import dayjs from 'dayjs'
import {
  Badge,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components'

import {
  LogActions,
  LogActionsTranslated,
  LogEntities,
  LogEntitiesTranslated,
  type ResponseLog,
} from '@/api/logs/logs.types'
import { cn } from '@/utils'

interface LogsDataTableProps {
  isLoading: boolean
  logs: ResponseLog[] | null
}

export function LogsDataTable({ logs, isLoading }: LogsDataTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Ação</TableHead>
          <TableHead>Detalhes</TableHead>
          <TableHead>Entidade afetada</TableHead>
          <TableHead>Ação realizada em</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {logs?.map(log => {
          const action = LogActionsTranslated[log.action as LogActions]
          const entity = LogEntitiesTranslated[log.entity as LogEntities]

          return (
            <TableRow key={log.id}>
              <TableCell className="max-w-24">
                <Badge
                  className={cn(
                    'w-full flex justify-center',
                    log.action === LogActions.CREATE &&
                      'bg-green-500 hover:bg-green-600',
                    log.action === LogActions.UPDATE &&
                      'bg-blue-500 hover:bg-blue-600',
                    log.action === LogActions.DELETE &&
                      'bg-red-500 hover:bg-red-600',
                  )}>
                  {action}
                </Badge>
              </TableCell>
              <TableCell>{log.details}</TableCell>
              <TableCell>{entity}</TableCell>
              <TableCell>
                {dayjs(log.createdAt).format(
                  'D [de] MMMM [de] YYYY [às] HH:mm',
                )}
              </TableCell>
            </TableRow>
          )
        })}
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
