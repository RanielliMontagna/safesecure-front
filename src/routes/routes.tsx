import {
  Navigate,
  Routes as RoutesV6,
  Route,
  BrowserRouter,
} from 'react-router-dom'

import { PublicLayout } from '@/layouts/publicLayout'
import { PrivateLayout } from '@/layouts/privateLayout'
import { privateRoutes, publicRoutes } from './routes.static'

export function Routes() {
  const isAuthenticated = true

  if (!isAuthenticated) {
    return (
      <BrowserRouter>
        <RoutesV6>
          <Route element={<PublicLayout />}>
            {publicRoutes.map(route => (
              <Route
                key={route.href}
                path={route.href}
                element={<route.Component />}
              />
            ))}

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
          {privateRoutes.map(route => (
            <Route
              key={route.href}
              path={route.href}
              element={<route.Component />}
            />
          ))}

          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Route>
      </RoutesV6>
    </BrowserRouter>
  )
}
