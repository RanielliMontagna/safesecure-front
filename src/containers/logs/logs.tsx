import { LogsData } from './logsData/logsData'

import { cn } from '@/utils'
import { Header } from '@/components'
import { useIsMobile } from '@/hooks'

export function Logs() {
  const { isMobile } = useIsMobile()

  return (
    <div className="flex flex-col gap-4 h-full">
      <Header
        title="Registros"
        description="Veja todos os registros de atividades realizadas na aplicação, para manter o controle de tudo."
      />
      <div
        className={cn(
          'rounded-md flex-1 overflow-auto',
          !isMobile && 'bg-white shadow-md p-4',
        )}>
        <LogsData />
      </div>
    </div>
  )
}
