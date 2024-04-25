import type { CoinsParams } from '../api/coin-api'
import { fetchCoins } from '../api/coin-api'
import type { Coin } from '../types/coins'
import { useQuery } from 'react-query'
import { useEffect, useState } from 'react'
import { getBookmarkFromLocalStorage } from '../utils/local-storage-utils'

export const useCoinFetch = ({ params, viewOptions }: { params: CoinsParams; viewOptions: string }) => {
  const [coinData, setCoinData] = useState<Coin[]>([])

  const { data, error } = useQuery<Coin[], Error>(['coins', params], () => fetchCoins(params))

  useEffect(() => {
    setCoinData(data ?? [])

    if (viewOptions === 'bookMark') {
      const bookmarkedCoinsData = getBookmarkFromLocalStorage()
      if (bookmarkedCoinsData) return setCoinData(bookmarkedCoinsData)
      setCoinData([])
    }
  }, [data, viewOptions])

  return { data: coinData, error }
}
