import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Skeleton,
} from '@/components'
import { IconProps } from '@radix-ui/react-icons/dist/types'
import { useDashboardCards } from './useDashboardCards'

interface DashboardCardProps {
  title: string
  subtitle?: string
  value: number | string
  icon?: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >
  isLoading?: boolean
}

function DashboardCard({
  title,
  subtitle,
  value,
  icon: Icon,
  isLoading = false,
}: DashboardCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className="w-8 h-8" />}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="w-7 h-7 mb-1" />
        ) : (
          <div className="text-2xl font-bold">{value}</div>
        )}
        {subtitle && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}
      </CardContent>
    </Card>
  )
}

export function DashboardCards() {
  const { data, isLoading } = useDashboardCards()

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <DashboardCard
        title="Alocações ativas"
        subtitle="Total de alocações ativas"
        isLoading={isLoading}
        value={data?.activeAllocations || 0}
      />
      <DashboardCard
        title="Alocações em atraso"
        subtitle="Total de alocações em atraso"
        isLoading={isLoading}
        value={data?.lateAllocations || 0}
      />
      <DashboardCard
        title="Equipamentos"
        subtitle="Equipamentos cadastrados"
        isLoading={isLoading}
        value={data?.equipments || 0}
      />
      <DashboardCard
        title="Funcionários"
        subtitle="Funcionários ativos"
        isLoading={isLoading}
        value={data?.employees || 0}
      />
    </div>
  )
}
