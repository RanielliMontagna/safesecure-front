import { Outlet } from 'react-router-dom'

import { Appbar, Sidebar } from '@/components'
import { useIsMobile } from '@/hooks'

export function PrivateLayout() {
  const { isMobile } = useIsMobile()

  if (isMobile) {
    return (
      <div className="h-screen flex flex-col">
        <Appbar />
        <div className="w-full h-full p-4 overflow-auto">
          <Outlet />
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="w-full p-8 overflow-auto">
        <Outlet />
      </div>
    </div>
  )
}
