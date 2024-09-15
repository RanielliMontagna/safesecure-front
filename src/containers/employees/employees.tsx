import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { PlusIcon } from '@radix-ui/react-icons'

import { Header } from '@/components'
import { EmployeesTable } from './employeesTable/employeesTable'
import { NewOrEditEmployeeDialog } from './newOrEditEmployeeDialog/newOrEditEmployeeDialog'
import { EmployeeDialogState } from './employees.types'
import { DeleteEmployeeDialog } from './deleteEmployeeDialog/deleteEmployeeDialog'

export function Employees() {
  const { search } = useLocation()

  const [employeeDialog, setEmployeeDialog] = useState<EmployeeDialogState>({
    open: false,
  })
  const [deleteDialog, setDeleteDialog] = useState<EmployeeDialogState>({
    open: false,
  })

  useEffect(() => {
    const params = new URLSearchParams(search)
    if (params.get('novo')) setEmployeeDialog({ open: true, data: null })
  }, [])

  return (
    <div className="flex flex-col gap-4 h-full">
      <Header
        title="Funcionários"
        description="Aqui você pode gerenciar os funcionários da sua empresa."
        button={{
          text: 'Novo funcionário',
          icon: PlusIcon,
          onClick: () => setEmployeeDialog({ open: true, data: null }),
        }}
      />
      <div className="p-4 rounded-md shadow-md flex-1 bg-white">
        <EmployeesTable
          setEmployeeDialog={setEmployeeDialog}
          setDeleteDialog={setDeleteDialog}
        />
      </div>
      <NewOrEditEmployeeDialog
        open={employeeDialog.open}
        data={employeeDialog.data}
        onClose={() => setEmployeeDialog(prev => ({ ...prev, open: false }))}
      />
      <DeleteEmployeeDialog
        open={deleteDialog.open}
        data={deleteDialog.data}
        onClose={() => setDeleteDialog(prev => ({ ...prev, open: false }))}
      />
    </div>
  )
}
