import dayjs from 'dayjs'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Skeleton,
  Badge,
} from '@/components'
import { cn } from '@/utils'
import { useIsMobile } from '@/hooks'

import { useLogsTable } from './useLogsTable'
import {
  LogActions,
  LogActionsTranslated,
  LogEntities,
  LogEntitiesTranslated,
} from '@/api/logs/logs.types'

import EmptySearchSVG from '@/assets/svgs/empty-search.svg'

export function LogsTable() {
  const { isMobile } = useIsMobile()
  const { logs, isLoading } = useLogsTable()

  if (!logs?.length) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
        <img
          src={EmptySearchSVG}
          alt="Nenhum equipamento encontrado"
          className={cn('w-1/4 h-auto mb-4', isMobile && 'w-1/2')}
        />
        <h2 className={cn('text-2xl font-semibold', isMobile && 'text-xl')}>
          Nenhum registro encontrado
        </h2>
        <p className={cn('text-gray-500', isMobile && 'text-sm')}>
          Não há registros de atividades no sistema. Comece utilizar o sistema
          para visualizar os registros.
        </p>
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Ação</TableHead>
          <TableHead>Entidade afetada</TableHead>
          <TableHead>Detalhes</TableHead>
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
