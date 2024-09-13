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

import { useCategoriesTable } from './useCategoriesTable'
import type { CategoriesTableProps } from '../categories.types'

import EmptySearchSVG from '@/assets/svgs/empty-search.svg'

export function CategoriesTable({
  setCategoryDialog,
  setDeleteDialog,
}: CategoriesTableProps) {
  const { isMobile } = useIsMobile()
  const { categories, isLoading } = useCategoriesTable()

  if (!categories?.length) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
        <img
          src={EmptySearchSVG}
          alt="Nenhuma categoria encontrada"
          className={cn('w-1/4 h-auto mb-4', isMobile && 'w-1/2')}
        />
        <h2 className={cn('text-2xl font-semibold', isMobile && 'text-xl')}>
          Nenhuma categoria encontrada
        </h2>
        <p className={cn('text-gray-500', isMobile && 'text-sm')}>
          Crie uma nova categoria clicando no botão{' '}
          {isMobile ? 'abaixo' : 'no canto superior direito'}.
        </p>
      </div>
    )
  }

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
            <TableCell>{category.name}</TableCell>
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
