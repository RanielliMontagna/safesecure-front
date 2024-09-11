import { Outlet } from 'react-router-dom'

import { Sidebar } from '@/components/sidebar/sidebar'

export function PrivateLayout() {
  return (
    <div className="h-screen flex ">
      <Sidebar />
      <div className="w-full p-8 overflow-auto">
        <Outlet />
      </div>
    </div>
  )
}
