import { Outlet } from 'react-router-dom'

import { Appbar, Loading, Sidebar } from '@/components'
import { useIsMobile } from '@/hooks'
import { useAppStore } from '@/store/app/app'

export function PrivateLayout() {
  const { isMobile } = useIsMobile()
  const { loading } = useAppStore()

  if (isMobile) {
    return (
      <div className="h-screen flex flex-col">
        <Appbar />
        <div className="w-full h-full p-4 overflow-auto">
          <Outlet />
        </div>
        {loading && <Loading />}
      </div>
    )
  }

  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="w-full p-8 overflow-auto">
        <Outlet />
      </div>
      {loading && <Loading />}
    </div>
  )
}
