import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'
import { useDashboardOverview } from './useDashboardOverview'

export function DashboardOverview() {
  const { data } = useDashboardOverview()

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data?.week}>
        <Legend
          verticalAlign="bottom"
          height={12}
          formatter={() => 'Alocações'}
        />
        <Tooltip
          content={({ payload, label }) => {
            return (
              <div className="bg-white p-2 shadow-md rounded-md">
                <p className="text-sm font-bold">{label}</p>
                <p className="text-sm">{payload?.[0]?.value} alocações</p>
              </div>
            )
          }}
        />
        <XAxis
          dataKey="day"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Bar
          dataKey="allocatedQuantity"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
