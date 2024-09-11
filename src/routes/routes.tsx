import {
  Navigate,
  Routes as RoutesV6,
  Route,
  BrowserRouter,
} from 'react-router-dom'

import {
  Categories,
  Dashboard,
  Employees,
  Equipments,
  Login,
} from '@/containers'
import { PublicLayout } from '@/layouts/publicLayout'
import { PrivateLayout } from '@/layouts/privateLayout'

export function Routes() {
  const isAuthenticated = false

  if (!isAuthenticated) {
    return (
      <BrowserRouter>
        <RoutesV6>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Login />} />
            <Route path="*" element={<Navigate to="/" replace={true} />} />
          </Route>
        </RoutesV6>
      </BrowserRouter>
    )
  }

  return (
    <BrowserRouter>
      <RoutesV6>
        <Route path="/" element={<PrivateLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="equipamentos" element={<Equipments />} />
          <Route path="categorias" element={<Categories />} />
          <Route path="funcionarios" element={<Employees />} />

          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Route>
      </RoutesV6>
    </BrowserRouter>
  )
}
