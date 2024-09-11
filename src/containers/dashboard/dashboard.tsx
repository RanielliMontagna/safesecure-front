import { Header } from '@/components'

import CheckList from '@/assets/svgs/checklist.svg'
import ConstructionHat from '@/assets/svgs/construction-hat.svg'
import ConstructionWorker from '@/assets/svgs/construction-worker.svg'
import Documents from '@/assets/svgs/documents.svg'
import DataExtraction from '@/assets/svgs/data-extraction.svg'

import { DashboardCard } from './dashboardCard/dashBoardCard'

export function Dashboard() {
  return (
    <div className="flex flex-col gap-8 gray">
      <Header
        title="Dashboard"
        description="Bem-vindo ao painel, acesse as funcionalidades para gerenciar sua aplicação."
      />
      <div className="grid gap-4">
        <div className="grid grid-cols-1 gap-8">
          <DashboardCard
            to="/alocacao"
            icon={ConstructionHat}
            title="Alocação de equipamentos"
            description="Gerencie a alocação de equipamentos para os funcionários de forma fácil e rápida."
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <DashboardCard
            to="/equipamentos"
            icon={CheckList}
            title="Equipamentos"
            description="Aqui você pode gerenciar os equipamentos um a um, para manter o controle de tudo."
          />
          <DashboardCard
            to="/funcionarios"
            icon={ConstructionWorker}
            title="Funcionários"
            description="Gerencie os funcionários, adicione, remova e edite informações."
          />
          <DashboardCard
            to="/categorias"
            icon={Documents}
            title="Categorias"
            description="Gerencie as categorias dos equipamentos, adicione, remova e edite informações."
          />
          <DashboardCard
            to="/registros"
            icon={DataExtraction}
            title="Registros"
            description="Veja todos os registros de atividades realizadas na aplicação, para manter o controle de tudo."
          />
        </div>
      </div>
    </div>
  )
}
