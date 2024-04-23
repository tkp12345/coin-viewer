import React, { ErrorInfo, ReactNode } from 'react'
import { Component } from 'react'

interface Props {
  children: ReactNode
  message?: string
  fallback?: ReactNode
  resetQuery?: () => void
}

interface State {
  hasError: boolean
  error: Error | null
  errorCase?: string
}

type ErrorBoundaryState =
  | {
      hasError: boolean
      error: null
      errorCase: null
    }
  | {
      hasError: boolean

      error: Error
      errorCase: null
    }
  | {
      hasError: boolean

      error: AxiosError<{ message: string }>
      errorCase: 'unauthorized' | 'get'
    }

// const initialState: State = { hasError: false, error: null ,errorCase:''}
const initialState: ErrorBoundaryState = { hasError: false, error: null, errorCase: null }

export class ErrorBoundary extends Component<Props, ErrorBoundaryState> {
  //erro상태 초기화
  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
    errorCase: null,
  }

  // error 발생시
  static getDerivedStateFromError(error: Error): State {

    return { hasError: true, error: error }
  }

  //error-boundary 하위 초기화 기능 ( resetQuery 에는 error 를 초기화하는 함수가 들어감)
  resetBoundary = () => {
    const { resetQuery } = this.props

    resetQuery && resetQuery()
    this.setState(initialState)
  }

  //하위 컴포넌트에서 오류가 발생한 후 호출 - 에러 기록 기능
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  render() {
    const { hasError } = this.state
    const { fallback, message } = this.props

    if (hasError) {
      if (fallback) {
        return fallback
      }

      return <span>{message ?? 'Load Failed'}</span>
    }

    return this.props.children
  }
}

export default ErrorBoundary
