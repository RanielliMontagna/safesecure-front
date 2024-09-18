import { Cross1Icon, MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { EmptyState, Form, CustomInput } from '@/components'
import { useIsMobile } from '@/hooks'
import { cn } from '@/utils'

import { useAllocationsTable } from './useAllocationsData'
import { AllocationsDataTable } from './allocationsData.table'
import { AllocationsDataList } from './allocationsData.list'

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
      {allocations && allocations?.length > 0 && !isMobile && (
        <AllocationsDataTable
          allocations={allocations}
          isLoading={isLoading}
          handleReturnAllocation={handleReturnAllocation}
        />
      )}
      {allocations && allocations?.length > 0 && isMobile && (
        <AllocationsDataList
          allocations={allocations}
          isLoading={isLoading}
          handleReturnAllocation={handleReturnAllocation}
        />
      )}
    </Form>
  )
}
