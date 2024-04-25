import type { ReactElement, ReactNode } from 'react'
import React, { forwardRef, Suspense } from 'react'
import ErrorBoundary from './error-boundary'
import { DefaultErrorFallBack } from './components/default-error-fall-back'
import { useQueryErrorResetBoundary } from 'react-query'
import { DefaultSuspenseLoading } from './components/default-suspense-loading'

interface AsyncBoundaryProps {
  children: ReactNode
  loadingFallback?: ReactElement
  errorFallback?: ReactElement
}

export const AsyncBoundary = forwardRef(({ children, errorFallback, loadingFallback }: AsyncBoundaryProps) => {
  const { reset } = useQueryErrorResetBoundary()

  return (
    <ErrorBoundary fallback={errorFallback || <DefaultErrorFallBack />} resetQuery={reset}>
      <Suspense fallback={loadingFallback || <DefaultSuspenseLoading />}>{children}</Suspense>
    </ErrorBoundary>
  )
})
