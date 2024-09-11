import { Navigate, useRoutes } from 'react-router-dom'

import { Categories, Dashboard, Employees, Equipments } from 'containers'

export function Routes() {
  return useRoutes([
    { path: '/', element: <Dashboard /> },
    { path: '/equipamentos', element: <Equipments /> },
    { path: '/categorias', element: <Categories /> },
    { path: '/funcionarios', element: <Employees /> },

    { path: '*', element: <Navigate to="/" replace={true} /> },
  ])
}
