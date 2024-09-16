import { Header } from '@/components'
import { LogsTable } from './logsTable/logsTable'

export function Logs() {
  return (
    <div className="flex flex-col gap-4 h-full">
      <Header
        title="Registros"
        description="Veja todos os registros de atividades realizadas na aplicação, para manter o controle de tudo."
      />
      <div className="p-4 rounded-md shadow-md flex-1 bg-white overflow-auto">
        <LogsTable />
      </div>
    </div>
  )
}
