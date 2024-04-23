import React from 'react'
import { CoinList } from '../components/coin-list'
import { AsyncBoundary } from '../../lib/utils/error/async-boundary'

export const CoinContainer = () => {
  return (
    <div>
      <h1>coin list</h1>
      <AsyncBoundary>
        <CoinList />
      </AsyncBoundary>
    </div>
  )
}
