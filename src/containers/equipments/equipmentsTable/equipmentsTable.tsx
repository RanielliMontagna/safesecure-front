import {
  Cross1Icon,
  DotsVerticalIcon,
  MagnifyingGlassIcon,
  Pencil2Icon,
  TrashIcon,
} from '@radix-ui/react-icons'

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
  EmptyState,
  Form,
  CustomInput,
} from '@/components'
import { useIsMobile } from '@/hooks'
import { cn } from '@/utils'

import { useEquipmentsTable } from './useEquipmentsTable'
import type { EquipmentsTableProps } from '../equipments.types'

export function EquipmentsTable({
  setEquipmentDialog,
  setDeleteDialog,
}: EquipmentsTableProps) {
  const { isMobile } = useIsMobile()
  const { form, equipments, isLoading } = useEquipmentsTable()

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
        <div className="max-sm:w-full">
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
      {equipments && equipments?.length > 0 && (
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
      )}
    </Form>
  )
}
