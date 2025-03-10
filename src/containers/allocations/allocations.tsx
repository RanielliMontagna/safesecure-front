import { useState } from 'react'
import { PlusIcon } from '@radix-ui/react-icons'

import { Header } from '@/components'
import { cn } from '@/utils'
import { useIsMobile } from '@/hooks'

import { AllocationsTable } from './allocationsData/allocationsData'
import { NewAllocationDialog } from './newAllocationDialog/newAllocationDialog'

export function Allocations() {
  const { isMobile } = useIsMobile()
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
      <div
        className={cn(
          'rounded-md flex-1 overflow-auto',
          !isMobile && 'bg-white shadow-md p-4',
        )}>
        <AllocationsTable />
      </div>
      <NewAllocationDialog
        open={allocationDialog.open}
        onClose={() => setAllocationDialog({ open: false })}
      />
    </div>
  )
}
