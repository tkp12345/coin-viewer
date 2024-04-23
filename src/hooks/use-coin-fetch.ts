import { useEffect, useState } from 'react'
import { fetchCoins } from '../api/coin-api'
import type { Coin } from '../types/coins'
import { getBookmarkFromLocalStorage } from '../utils/local-storage-utils'

export const useCoinFetch = (
  viewOptions: string,
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
    if (viewOptions === 'bookMark') {
      const bookmarkedCoinsData = getBookmarkFromLocalStorage()
      if (bookmarkedCoinsData) return setData(bookmarkedCoinsData)
      setData([])
    }
    const fetchData = async () => {
      try {
        const result = await fetchCoins(currency, ids, order, perPage, page, sparkline, priceChangePercentage, locale)
        setData(result)
      } catch (error) {
        setError(error as Error)
      }
    }

    fetchData()
  }, [currency, perPage, page, viewOptions])

  return { data, error }
}
