import { useLocation, useNavigate } from 'react-router-dom'

import { Button } from '../ui/button'

import { cn } from '@/lib/utils'
import { privateRoutes } from '@/routes/routes.static'
import { APPLICATION_NAME } from '@/constants'

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  expansive?: {
    isOpen: boolean
    onClose: () => void
  }
}

function Sidebar({ className, expansive }: SidebarProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const sidebarClasses = cn(
    'bg-gray-200 max-w-[270px] overflow-auto no-scrollbar transform transition-transform duration-300',
    className,
    expansive && expansive?.isOpen && 'translate-x-0',
    expansive && !expansive?.isOpen && '-translate-x-full',
  )

  return (
    <div className={sidebarClasses}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            {APPLICATION_NAME}
          </h2>
          <div className="space-y-1">
            {privateRoutes.map(route => (
              <Button
                key={route.href}
                variant="ghost"
                onClick={() => {
                  expansive?.onClose()
                  navigate(route.href)
                }}
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

function SidebarWrapper({ expansive }: SidebarProps) {
  if (expansive) {
    return (
      <>
        <Sidebar
          expansive={expansive}
          className="absolute left-0 top-0 bottom-0 h-full z-50"
        />
        <div
          className={cn(
            'fixed inset-0 bg-black bg-opacity-30 z-40 transition-transform duration-300',
            expansive.isOpen ? 'translate-x-0' : '-translate-x-full',
          )}
          onClick={expansive.onClose}
        />
      </>
    )
  }

  return <Sidebar />
}

export { SidebarWrapper as Sidebar }
