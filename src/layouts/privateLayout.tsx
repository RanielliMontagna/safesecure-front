import { Outlet } from 'react-router-dom'

export function PrivateLayout() {
  return (
    <div className="h-screen">
      <Outlet />
    </div>
  )
}
