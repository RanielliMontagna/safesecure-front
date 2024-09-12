import { Routes } from '@/routes/routes'
import { Toaster } from '@/components'
import Providers from '@/providers/providers'

import '@/styles/global.css'

export default function App() {
  return (
    <Providers>
      <Routes />
      <Toaster />
    </Providers>
  )
}
