import {
  DashboardIcon,
  PersonIcon,
  ArchiveIcon,
  LockOpen1Icon,
  BookmarkIcon,
} from '@radix-ui/react-icons'

import {
  Login,
  Dashboard,
  Allocation,
  Equipments,
  Employees,
  Categories,
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
    Component: Allocation,
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
]
