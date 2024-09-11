import { cn } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'

const cardStylesBase = cn(
  'bg-white shadow-md rounded-md p-4 border border-gray-100 text-center flex flex-col items-center justify-center',
  'hover:bg-gray-100 hover:scale-[1.02] hover:border-gray-200 cursor-pointer transition-all transform',
)

interface DashboardCardProps {
  to: string
  icon: string
  title: string
  description: string
}

export function DashboardCard({
  to,
  icon,
  title,
  description,
}: DashboardCardProps) {
  const navigate = useNavigate()

  return (
    <div className={cardStylesBase} onClick={() => navigate(to)}>
      <img
        src={icon}
        alt={`${title} icon`}
        className="h-auto w-min-[10vh] w-[15vh]"
      />
      <div>
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <p className="text-gray-600">{description} </p>
      </div>
    </div>
  )
}
