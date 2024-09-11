import { cn } from '@/lib/utils'

import { Button } from '../ui/button'
import { privateRoutes } from '@/routes/routes.static'
import { useLocation, useNavigate } from 'react-router-dom'

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div
      className={cn(
        'bg-gray-200 max-w-[270px] overflow-auto no-scrollbar',
        className,
      )}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Safe Secure
          </h2>
          <div className="space-y-1">
            {privateRoutes.map(route => (
              <Button
                key={route.href}
                variant="ghost"
                onClick={() => navigate(route.href)}
                className={cn(
                  'w-full justify-start',
                  location.pathname === route.href && 'bg-gray-300',
                )}>
                {route.Icon && <route.Icon className="w-5 h-5 mr-2" />}
                {route.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
