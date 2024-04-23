import { useEffect, useState } from 'react'
import { fetchCoins } from '../api/coin-api'
import type { Coin } from '../types/coins'

export const useCoinFetch = (
  currency: string,
  ids: string,
  order: string = 'market_cap_desc',
  perPage: number = 10,
  page: number = 1,
  sparkline: boolean = false,
  priceChangePercentage: string = '1h,24h,7d',
  locale: string = 'ko',
) => {
  const [data, setData] = useState<Coin[]>([])
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchCoins(currency, ids, order, perPage, page, sparkline, priceChangePercentage, locale)
        setData(result)
      } catch (error) {
        setError(error as Error)
      }
    }

    fetchData()
  }, [currency, perPage, page])

  return { data, error }
}
