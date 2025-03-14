import {
  DashboardIcon,
  PersonIcon,
  ArchiveIcon,
  LockOpen1Icon,
  BookmarkIcon,
  ActivityLogIcon,
} from '@radix-ui/react-icons'

import {
  Login,
  Dashboard,
  Allocations,
  Equipments,
  Employees,
  Categories,
  Logs,
} from '@/containers'

export const publicRoutes = [{ name: 'Login', href: '/', Component: Login }]

export const privateRoutes = [
  {
    name: 'Dashboard',
    href: '/',
    Component: Dashboard,
    Icon: DashboardIcon,
  },
  {
    name: 'Alocação de Equipamentos',
    href: '/alocacao',
    Component: Allocations,
    Icon: LockOpen1Icon,
  },
  {
    name: 'Equipamentos',
    href: '/equipamentos',
    Component: Equipments,
    Icon: ArchiveIcon,
  },
  {
    name: 'Funcionários',
    href: '/funcionarios',
    Component: Employees,
    Icon: PersonIcon,
  },
  {
    name: 'Categorias',
    href: '/categorias',
    Component: Categories,
    Icon: BookmarkIcon,
  },
  {
    name: 'Registros',
    href: '/registros',
    Component: Logs,
    Icon: ActivityLogIcon,
  },
]
