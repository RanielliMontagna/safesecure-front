import { Outlet } from 'react-router-dom'

export function PublicLayout() {
  return (
    <div className="h-screen">
      <Outlet />
    </div>
  )
}
