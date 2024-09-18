import { Cross1Icon, MagnifyingGlassIcon } from '@radix-ui/react-icons'

import { EmptyState, Form, CustomInput } from '@/components'
import { useIsMobile } from '@/hooks'
import { cn } from '@/utils'

import { useEquipmentsData } from './useEquipmentsData'
import type { EquipmentsDataProps } from '../equipments.types'
import { EquipmentsDataTable } from './equipmentsData.table'
import { EquipmentsDataList } from './equipmentsData.list'

export function EquipmentsData({
  setEquipmentDialog,
  setDeleteDialog,
}: EquipmentsDataProps) {
  const { isMobile } = useIsMobile()
  const { form, equipments, isLoading } = useEquipmentsData()

  if (equipments === null) {
    return (
      <EmptyState
        title="Nenhum equipamento cadastrado"
        message={`Crie uma novo equipamento clicando no botão ${
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
            Equipamentos{' '}
            <p className="text-sm text-gray-500">
              ({String(equipments?.length)})
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
            placeholder="Buscar equipamento"
          />
        </div>
      </div>
      {equipments?.length === 0 && (
        <EmptyState
          title="Nenhum equipamento encontrado"
          message="Tente buscar por outro equipamento ou criar um novo equipamento."
          className="h-[calc(100%-4rem)]"
        />
      )}
      {equipments && equipments?.length > 0 && !isMobile && (
        <EquipmentsDataTable
          equipments={equipments}
          setDeleteDialog={setDeleteDialog}
          setEquipmentDialog={setEquipmentDialog}
          isLoading={isLoading}
        />
      )}
      {equipments && equipments?.length > 0 && isMobile && (
        <EquipmentsDataList
          equipments={equipments}
          setDeleteDialog={setDeleteDialog}
          setEquipmentDialog={setEquipmentDialog}
          isLoading={isLoading}
        />
      )}
    </Form>
  )
}
