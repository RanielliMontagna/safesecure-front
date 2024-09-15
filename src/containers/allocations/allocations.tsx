import { useState } from 'react'
import { PlusIcon } from '@radix-ui/react-icons'

import { Header } from '@/components'

import { AllocationsTable } from './allocationsTable/allocationsTable'
import { NewAllocationDialog } from './newAllocationDialog/newAllocationDialog'

export function Allocations() {
  const [allocationDialog, setAllocationDialog] = useState({ open: false })

  return (
    <div className="flex flex-col gap-4 h-full">
      <Header
        title="Alocação de equipamentos"
        description="Gerencie a alocação de equipamentos para os funcionários de forma fácil e rápida."
        button={{
          text: 'Alocar equipamento',
          icon: PlusIcon,
          onClick: () => setAllocationDialog({ open: true }),
        }}
      />
      <div className="p-4 rounded-md shadow-md flex-1 bg-white">
        <AllocationsTable />
      </div>
      <NewAllocationDialog
        open={allocationDialog.open}
        onClose={() => setAllocationDialog({ open: false })}
      />
    </div>
  )
}
