import { PropsWithChildren } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ErrorBoundary
      fallback={
        //TODO: Add a better error message
        <div>
          <h1>Something went wrong</h1>
        </div>
      }>
      {children}
    </ErrorBoundary>
  )
}
