import { Cross1Icon, MagnifyingGlassIcon } from '@radix-ui/react-icons'

import { EmptyState, Form, CustomInput } from '@/components'
import { cn } from '@/utils'
import { useIsMobile } from '@/hooks'

import { useLogsData } from './useLogsData'
import { LogsDataTable } from './logsData.table'
import { LogsDataList } from './logsData.list'

export function LogsData() {
  const { isMobile } = useIsMobile()
  const { form, logs, isLoading } = useLogsData()

  if (logs === null) {
    return (
      <EmptyState
        title="Nenhum registro encontrado"
        message="Não há registros de atividades no sistema. Comece utilizar o sistema para visualizar os registros."
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
            Registros
            <p className="text-sm text-gray-500">({String(logs?.length)})</p>
          </h2>
        </div>
        <div className="max-md:w-full">
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
            placeholder="Buscar registro"
          />
        </div>
      </div>
      {logs?.length === 0 && (
        <EmptyState
          title="Nenhum registro encontrado"
          message="Tente buscar por outro termo ou realize uma nova ação para visualizar os registros."
          className="h-[calc(100%-6rem)]"
        />
      )}
      {logs && logs?.length > 0 && !isMobile && (
        <LogsDataTable logs={logs} isLoading={isLoading} />
      )}
      {logs && logs?.length > 0 && isMobile && (
        <LogsDataList logs={logs} isLoading={isLoading} />
      )}
    </Form>
  )
}
