import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { PlusIcon } from '@radix-ui/react-icons'

import { Header } from '@/components'
import { EquipmentsTable } from './equipmentsTable/equipmentsTable'
import { NewOrEditEquipmentDialog } from './newOrEditEquipmentDialog/newOrEditEquipmentDialog'
import { EquipmentDialogState } from './equipments.types'
import { DeleteEquipmentDialog } from './deleteEquipmentDialog/deleteEquipmentDialog'

export function Equipments() {
  const { search } = useLocation()

  const [equipmentDialog, setEquipmentDialog] = useState<EquipmentDialogState>({
    open: false,
  })
  const [deleteDialog, setDeleteDialog] = useState<EquipmentDialogState>({
    open: false,
  })

  useEffect(() => {
    const params = new URLSearchParams(search)
    if (params.get('novo')) setEquipmentDialog({ open: true, data: null })
  }, [])

  return (
    <div className="flex flex-col gap-4 h-full">
      <Header
        title="Equipamentos"
        description="Aqui você pode gerenciar os equipamentos um a um, para manter o controle de tudo."
        button={{
          text: 'Novo equipamento',
          icon: PlusIcon,
          onClick: () => setEquipmentDialog({ open: true, data: null }),
        }}
      />
      <div className="p-4 rounded-md shadow-md flex-1 bg-white overflow-auto">
        <EquipmentsTable
          setEquipmentDialog={setEquipmentDialog}
          setDeleteDialog={setDeleteDialog}
        />
      </div>
      <NewOrEditEquipmentDialog
        open={equipmentDialog.open}
        data={equipmentDialog.data}
        onClose={() => setEquipmentDialog(prev => ({ ...prev, open: false }))}
      />
      <DeleteEquipmentDialog
        open={deleteDialog.open}
        data={deleteDialog.data}
        onClose={() => setDeleteDialog(prev => ({ ...prev, open: false }))}
      />
    </div>
  )
}
