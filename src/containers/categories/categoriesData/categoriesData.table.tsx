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

import type { ResponseCategory } from '@/api/categories/categories.types'
import type { CategoriesDataProps } from '../categories.types'

interface CategoriesDataTableProps extends CategoriesDataProps {
  isLoading: boolean
  categories: ResponseCategory[] | null
}

export function CategoriesDataTable({
  isLoading,
  categories,
  setCategoryDialog,
  setDeleteDialog,
}: CategoriesDataTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Nome</TableHead>
          <TableHead>Descrição</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories?.map(category => (
          <TableRow key={category.id}>
            <TableCell className="truncate">{category.name}</TableCell>
            {category.description ? (
              <TableCell>{category.description}</TableCell>
            ) : (
              <TableCell className="text-muted-foreground">
                Sem descrição disponível
              </TableCell>
            )}
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
                      setCategoryDialog({ open: true, data: category })
                    }>
                    <Pencil2Icon className="w-4 h-4 mr-2" />
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setDeleteDialog({ open: true, data: category })
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
