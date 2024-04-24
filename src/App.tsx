import React from 'react'
import { AsyncBoundary } from '../lib/utils/error/async-boundary'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CoinDetailContainer } from './container/coin-detail-container'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { toastDefaultOptions } from './utils/toastify-options'
import { CoinGnb } from './components/coin/coin-gnb'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AsyncBoundary>
        <Routes>
          <Route path="/" Component={CoinGnb} />
          <Route path="/coin/:id" Component={CoinDetailContainer} />
        </Routes>
        <ToastContainer {...toastDefaultOptions} />
      </AsyncBoundary>
    </BrowserRouter>
  )
}
export default App
