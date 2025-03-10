import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { PlusIcon } from '@radix-ui/react-icons'

import { Header } from '@/components'
import { useIsMobile } from '@/hooks'
import { cn } from '@/utils'

import { CategoriesData } from './categoriesData/categoriesData'
import { NewOrEditCategoryDialog } from './newOrEditCategoryDialog/newOrEditCategoryDialog'
import { CategoryDialogState } from './categories.types'
import { DeleteCategoryDialog } from './deleteCategoryDialog/deleteCategoryDialog'

export function Categories() {
  const { isMobile } = useIsMobile()
  const { search } = useLocation()

  const [categoryDialog, setCategoryDialog] = useState<CategoryDialogState>({
    open: false,
  })
  const [deleteDialog, setDeleteDialog] = useState<CategoryDialogState>({
    open: false,
  })

  useEffect(() => {
    const params = new URLSearchParams(search)
    if (params.get('novo')) setCategoryDialog({ open: true, data: null })
  }, [])

  return (
    <div className="flex flex-col gap-4 h-full">
      <Header
        title="Categorias de equipamentos"
        description="Gerencie as categorias dos seus equipamentos aqui."
        button={{
          text: 'Nova Categoria',
          icon: PlusIcon,
          onClick: () => setCategoryDialog({ open: true, data: null }),
        }}
      />
      <div
        className={cn(
          'rounded-md flex-1 overflow-auto',
          !isMobile && 'bg-white shadow-md p-4',
        )}>
        <CategoriesData
          setCategoryDialog={setCategoryDialog}
          setDeleteDialog={setDeleteDialog}
        />
      </div>
      <NewOrEditCategoryDialog
        open={categoryDialog.open}
        data={categoryDialog.data}
        onClose={() => setCategoryDialog(prev => ({ ...prev, open: false }))}
      />
      <DeleteCategoryDialog
        open={deleteDialog.open}
        data={deleteDialog.data}
        onClose={() => setDeleteDialog(prev => ({ ...prev, open: false }))}
      />
    </div>
  )
}
