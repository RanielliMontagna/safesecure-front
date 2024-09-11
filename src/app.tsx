import { Routes } from '@/routes/routes'
import Providers from '@/providers/providers'

import '@/styles/global.css'

export default function App() {
  return (
    <Providers>
      <Routes />
    </Providers>
  )
}
