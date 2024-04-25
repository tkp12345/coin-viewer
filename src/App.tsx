import React from 'react'
import { AsyncBoundary } from '../lib/utils/error/async-boundary'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CoinDetailContainer } from './container/coin-detail-container'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { toastDefaultOptions } from './utils/toastify-options'
import { CoinGnb } from './components/coin/coin-gnb'
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query'
import { DefaultQueryErrorHandler } from '../lib/utils/error/components/default-query-error-handler'
import { DefaultNotFound } from '../lib/utils/error/components/default-not-found'

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (err) => console.error(`${err}`),
  }),
  defaultOptions: {
    queries: {
      onError: (error) => DefaultQueryErrorHandler(error),
      suspense: true,
      refetchOnWindowFocus: false,
      useErrorBoundary: true,
      retry: 0,
    },
  },
})

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AsyncBoundary>
          <Routes>
            <Route path="/" Component={CoinGnb} />
            <Route path="/coin/:id" Component={CoinDetailContainer} />
            <Route path="*" Component={DefaultNotFound} />
          </Routes>
          <ToastContainer {...toastDefaultOptions} />
        </AsyncBoundary>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
export default App
