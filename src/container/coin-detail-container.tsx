import React from 'react'
import { CoinDetailProvider } from '../context/coin-detail-context-provider'
import { AsyncBoundary } from '../../lib/utils/error/async-boundary'
import { CoinDetail } from '../components/coin/detail/coin-detail'

export const CoinDetailContainer = () => {
  return (
    <AsyncBoundary>
      <CoinDetailProvider>
        <CoinDetail />
      </CoinDetailProvider>
    </AsyncBoundary>
  )
}
