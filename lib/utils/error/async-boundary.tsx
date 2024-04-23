import React, { ReactElement, ReactNode, Ref } from 'react'
import { useImperativeHandle } from 'react'
import { useRef } from 'react'
import { forwardRef, Suspense } from 'react'
import ErrorBoundary from './error-boundary'
import { DefaultErrorFallBack } from './components/default-error-fall-back'

interface AsyncBoundaryProps {
  children: ReactNode
  loadingFallback?: ReactElement
  errorFallback?: ReactElement
}

interface ResetRef {
  reset?(): void
}

export const AsyncBoundary = forwardRef(
  ({ children, loadingFallback, errorFallback }: AsyncBoundaryProps, resetRef: Ref<ResetRef>) => {
    const ref = useRef<ErrorBoundary | null>(null)

    useImperativeHandle(resetRef, () => ({
      reset: () => ref.current?.resetBoundary(),
    }))

    return (
      <ErrorBoundary fallback={errorFallback || <DefaultErrorFallBack />}>
        <Suspense fallback={loadingFallback || 'lodaing'}>{children}</Suspense>
      </ErrorBoundary>
    )
  },
)
