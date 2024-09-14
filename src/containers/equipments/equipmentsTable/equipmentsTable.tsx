import { DotsVerticalIcon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons'

import {
  Button,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Skeleton,
} from '@/components'
import { useIsMobile } from '@/hooks'
import { cn } from '@/utils'

import { useEquipmentsTable } from './useEquipmentsTable'
import type { EquipmentsTableProps } from '../equipments.types'

import EmptySearchSVG from '@/assets/svgs/empty-search.svg'

export function EquipmentsTable({
  setEquipmentDialog,
  setDeleteDialog,
}: EquipmentsTableProps) {
  const { isMobile } = useIsMobile()
  const { equipments, isLoading } = useEquipmentsTable()

  if (!equipments?.length) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
        <img
          src={EmptySearchSVG}
          alt="Nenhum equipamento encontrado"
          className={cn('w-1/4 h-auto mb-4', isMobile && 'w-1/2')}
        />
        <h2 className={cn('text-2xl font-semibold', isMobile && 'text-xl')}>
          Nenhum equipamento encontrado
        </h2>
        <p className={cn('text-gray-500', isMobile && 'text-sm')}>
          Crie um novo equipamento clicando no botão{' '}
          {isMobile ? 'abaixo' : 'no canto superior direito'}.
        </p>
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Código</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Categoria</TableHead>
          <TableHead>Quantidade</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {equipments?.map(equipment => (
          <TableRow key={equipment.id}>
            <TableCell>{equipment.code}</TableCell>
            <TableCell className="truncate">{equipment.name}</TableCell>
            <TableCell>{equipment.category.name}</TableCell>
            <TableCell>{equipment.quantity}</TableCell>
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
