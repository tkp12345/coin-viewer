import React from 'react'
import { useCoinFetch } from '../hooks/use-coin-fetch'

export const CoinList = () => {
  const { data: coins, isLoading, error } = useCoinFetch('krw', 50, 1)

  return (
    <div>
      {coins.map((coin: any) => (
        <div key={coin.id}>
          <span>{coin.name}</span>
        </div>
      ))}
    </div>
  )
}
