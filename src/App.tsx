import React from 'react'
import { AsyncBoundary } from '../lib/utils/error/async-boundary'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CoinContainer } from './container/coin-container'
import { CoinDetailContainer } from './container/coin-detail-container'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AsyncBoundary>
        <Routes>
          <Route path="/" Component={CoinContainer} />
          <Route path="/coin/:id" Component={CoinDetailContainer} />
          {/* ...other routes */}
        </Routes>
      </AsyncBoundary>
    </BrowserRouter>
  )
}
export default App
