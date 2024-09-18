import type { ResponseEquipment } from '@/api/equipments/equipments.types'
import type { EquipmentsDataProps } from '../equipments.types'
import {
  Skeleton,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Button,
  Card,
} from '@/components'

import { DotsVerticalIcon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons'

interface EquipmentsDataListProps extends EquipmentsDataProps {
  isLoading: boolean
  equipments: ResponseEquipment[] | null
}

export function EquipmentsDataList({
  equipments,
  isLoading,
  setEquipmentDialog,
  setDeleteDialog,
}: EquipmentsDataListProps) {
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
      {equipments?.map(equipment => (
        <Card
          key={equipment.id}
          className="flex items-center justify-between p-4">
          <div>
            <h3 className="text-sm font-semibold pb-1">
              {equipment.name}{' '}
              <span className="text-xs text-gray-500">
                / {equipment.category.name}
              </span>
            </h3>
            <p className="text-xs text-gray-500">
              <b>Código:</b> {equipment.code}
            </p>

            {/* quantidade e quantidade available */}
            <p className="text-xs text-gray-500">
              <b>Quantidade:</b> {equipment.available_quantity}/
              {equipment.quantity}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <DotsVerticalIcon className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() =>
                  setEquipmentDialog({
                    open: true,
                    data: {
                      id: equipment.id,
                      code: equipment.code.toString(),
                      name: equipment.name,
                      categoryId: equipment.category.id,
                      quantity: equipment.quantity.toString(),
                    },
                  })
                }>
                <Pencil2Icon className="w-4 h-4 mr-2" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setDeleteDialog({
                    open: true,
                    data: {
                      id: equipment.id,
                      code: equipment.code.toString(),
                      name: equipment.name,
                      categoryId: equipment.category.id,
                      quantity: equipment.quantity.toString(),
                    },
                  })
                }}>
                <TrashIcon className="w-4 h-4 mr-2" />
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Card>
      ))}
    </div>
  )
}
