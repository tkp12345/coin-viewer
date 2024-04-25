import type { ReactElement, ReactNode } from 'react'
import React, { forwardRef, Suspense } from 'react'
import ErrorBoundary from './error-boundary'
import { DefaultErrorFallBack } from './components/default-error-fall-back'
import { QueryErrorResetBoundary, useQueryErrorResetBoundary } from 'react-query'
import { DefaultSuspenseLoading } from './components/default-suspense-loading'

interface AsyncBoundaryProps {
  children: ReactNode
  loadingFallback?: ReactElement
  errorFallback?: ReactElement
}

export const AsyncBoundary = forwardRef(({ children, loadingFallback }: AsyncBoundaryProps) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary resetQuery={reset} fallback={<DefaultErrorFallBack reset={reset} />}>
          <Suspense fallback={loadingFallback || <DefaultSuspenseLoading />}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
})
