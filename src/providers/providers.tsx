import { PropsWithChildren } from 'react'
import { QueryClientProvider } from 'react-query'
import { ErrorBoundary } from 'react-error-boundary'

import { queryClient } from '@/lib/react-query'

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ErrorBoundary
      fallback={
        //TODO: Add a better error message
        <div>
          <h1>Something went wrong</h1>
        </div>
      }>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ErrorBoundary>
  )
}
