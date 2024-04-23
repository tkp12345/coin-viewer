import React from 'react'
import { CoinList } from '../components/coin/coin-list'
import { AsyncBoundary } from '../../lib/utils/error/async-boundary'
import { CoinFilterContextProvider } from '../context/coin-context-provider'

export const CoinContainer = () => {
  return (
    <AsyncBoundary>
      <CoinFilterContextProvider>
        <CoinList />
      </CoinFilterContextProvider>
    </AsyncBoundary>
  )
}
