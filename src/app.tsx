import { BrowserRouter } from 'react-router-dom'

import { Routes } from '@/routes/routes'
import Providers from '@/providers/providers'

import '@/index.css'

export default function App({ Router = BrowserRouter }) {
  return (
    <Providers>
      <Routes />
    </Providers>
  )
}
