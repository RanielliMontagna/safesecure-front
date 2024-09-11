import { BrowserRouter } from 'react-router-dom'

import { Routes } from 'routes/routes'
import Providers from 'providers/providers'

export default function App({ Router = BrowserRouter }) {
  return (
    <Providers>
      <Router>
        <Routes />
      </Router>
    </Providers>
  )
}
