import { useLocation, useNavigate } from 'react-router-dom'
import { ExitIcon } from '@radix-ui/react-icons'

import { Button } from '../ui/button'

import { cn } from '@/utils'
import { privateRoutes } from '@/routes/routes.static'
import { APPLICATION_NAME } from '@/constants'
import { useAuthStore } from '@/store/auth/auth'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { getInitials } from '@/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  expansive?: {
    isOpen: boolean
    onClose: () => void
  }
}

function Sidebar({ className, expansive }: SidebarProps) {
  const { user, clearStore } = useAuthStore()

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
      <div className="space-y-4 py-4 h-screen">
        <div className="px-3 py-2 h-full flex flex-col">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            {APPLICATION_NAME}
          </h2>
          <div className="space-y-1 flex-1">
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
          <div className="mt-4 pt-4 border-t border-gray-300">
            <div className="flex items-center p-2 gap-2">
              <Avatar>
                <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col justify-center flex-1">
                <h3 className="text-sm font-semibold tracking-tight m-0">
                  {user?.name}
                </h3>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-xs text-gray-500">Online</span>
                </div>
              </div>
              <TooltipProvider>
                <Tooltip delayDuration={400}>
                  <TooltipTrigger>
                    <Button
                      variant="ghost"
                      onClick={clearStore}
                      className="w-8 h-8 p-1 rounded-full flex items-center justify-center hover:bg-gray-300">
                      <ExitIcon className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>Sair</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
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
