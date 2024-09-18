import { MagnifyingGlassIcon, Cross1Icon } from '@radix-ui/react-icons'

import { CustomInput, Form, EmptyState } from '@/components'
import { useIsMobile } from '@/hooks'
import { cn } from '@/utils'

import { useCategoriesData } from './useCategoriesData'
import type { CategoriesDataProps } from '../categories.types'
import { CategoriesDataTable } from './categoriesData.table'
import { CategoriesDataList } from './categoriesData.list'

export function CategoriesData({
  setCategoryDialog,
  setDeleteDialog,
}: CategoriesDataProps) {
  const { isMobile } = useIsMobile()
  const { form, categories, isLoading } = useCategoriesData()

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
            placeholder="Buscar categoria"
          />
        </div>
      </div>
      {categories?.length === 0 && (
        <EmptyState
          title="Nenhuma categoria encontrada"
          message="Tente buscar por outra categoria ou criar uma nova."
          className="h-[calc(100%-6rem)]"
        />
      )}
      {categories && categories?.length > 0 && !isMobile && (
        <CategoriesDataTable
          categories={categories}
          isLoading={isLoading}
          setCategoryDialog={setCategoryDialog}
          setDeleteDialog={setDeleteDialog}
        />
      )}
      {categories && categories?.length > 0 && isMobile && (
        <CategoriesDataList
          categories={categories}
          isLoading={isLoading}
          setCategoryDialog={setCategoryDialog}
          setDeleteDialog={setDeleteDialog}
        />
      )}
    </Form>
  )
}
