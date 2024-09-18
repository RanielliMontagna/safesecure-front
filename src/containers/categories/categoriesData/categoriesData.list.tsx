import type { ResponseCategory } from '@/api/categories/categories.types'
import type { CategoriesDataProps } from '../categories.types'
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

interface CategoriesDataListProps extends CategoriesDataProps {
  isLoading: boolean
  categories: ResponseCategory[] | null
}

export function CategoriesDataList({
  categories,
  isLoading,
  setCategoryDialog,
  setDeleteDialog,
}: CategoriesDataListProps) {
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
      {categories?.map(category => (
        <Card
          key={category.id}
          className="flex items-center justify-between p-4">
          <div>
            <h3 className="text-md font-semibold">{category.name}</h3>
            <p className="text-xs text-gray-500">{category.description}</p>
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
        </Card>
      ))}
    </div>
  )
}
