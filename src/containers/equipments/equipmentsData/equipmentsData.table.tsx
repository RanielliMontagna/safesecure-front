import { DotsVerticalIcon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons'

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components'

import type { ResponseEquipment } from '@/api/equipments/equipments.types'
import type { EquipmentsDataProps } from '../equipments.types'

interface EquipmentsDataTableProps extends EquipmentsDataProps {
  isLoading: boolean
  equipments: ResponseEquipment[] | null
}

export function EquipmentsDataTable({
  isLoading,
  equipments,
  setDeleteDialog,
  setEquipmentDialog,
}: EquipmentsDataTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="max-w-[70px]">Código</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Estoque</TableHead>
          <TableHead>Quantidade disponível</TableHead>
          <TableHead>Categoria</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {equipments?.map(equipment => (
          <TableRow key={equipment.id}>
            <TableCell>{equipment.code}</TableCell>
            <TableCell className="truncate">{equipment.name}</TableCell>
            <TableCell>{equipment.quantity}</TableCell>
            <TableCell>{equipment.available_quantity}</TableCell>
            <TableCell>{equipment.category.name}</TableCell>
            <TableCell className="text-right">
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
            </TableCell>
          </TableRow>
        ))}
        {isLoading &&
          Array.from({ length: 2 }).map((_, index) => (
            <TableRow key={index}>
              {Array.from({ length: 6 }).map((_, index) => (
                <TableCell key={index}>
                  <Skeleton className="w-full h-8" />
                </TableCell>
              ))}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}
