import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Header,
} from '@/components'

import { DashboardCards } from './dashboardCards/dashboardCards'
import { DashboardOverview } from './dashboardOverview/dashboardOverview'
import { useNavigate } from 'react-router-dom'
import { DashboardRecentAllocations } from './dashboardRecentAllocations/dashboardRecentAllocations'

export function Dashboard() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-8 gray">
      <Header
        title="Dashboard"
        description="Bem-vindo ao painel, acesse as funcionalidades para gerenciar sua aplicação."
        button={{
          text: 'Ir para alocações',
          onClick: () => navigate('/alocacao'),
          disablemobile: 'true',
        }}
      />
      <div className="grid gap-4">
        <DashboardCards />
        <div className="grid gap-4 max-md:grid-cols-2 lg:grid-cols-7">
          <Card className="max-md:col-span-2 lg:col-span-4">
            <CardHeader>
              <CardTitle>Visão geral</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <DashboardOverview />
            </CardContent>
          </Card>
          <Card className="max-md:col-span-2 lg:col-span-3">
            <CardHeader>
              <CardTitle>Alocações recentes</CardTitle>
              <CardDescription>
                Veja as alocações mais recentes realizadas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DashboardRecentAllocations />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
