import {
  DotsVerticalIcon,
  Pencil2Icon,
  TrashIcon,
  MagnifyingGlassIcon,
  Cross1Icon,
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
  CustomInput,
  Form,
  EmptyState,
} from '@/components'
import { useIsMobile } from '@/hooks'
import { cn } from '@/utils'

import { useCategoriesTable } from './useCategoriesTable'
import type { CategoriesTableProps } from '../categories.types'

export function CategoriesTable({
  setCategoryDialog,
  setDeleteDialog,
}: CategoriesTableProps) {
  const { isMobile } = useIsMobile()
  const { form, categories, isLoading } = useCategoriesTable()

  if (categories === null) {
    return (
      <EmptyState
        title="Nenhuma categoria cadastrada"
        message={`Crie uma nova categoria clicando no botão ${
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
            Categorias{' '}
            <p className="text-sm text-gray-500">
              ({String(categories?.length)})
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
            placeholder="Buscar categoria"
          />
        </div>
      </div>
      {categories?.length === 0 && (
        <EmptyState
          title="Nenhuma categoria encontrada"
          message="Tente buscar por outra categoria ou criar uma nova."
          className="h-[calc(100%-4rem)]"
        />
      )}
      {categories && categories?.length > 0 && (
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
      )}
    </Form>
  )
}
