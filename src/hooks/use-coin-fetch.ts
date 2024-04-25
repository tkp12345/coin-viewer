import type { CoinsParams } from '../api/coin-api'
import { fetchCoins } from '../api/coin-api'
import type { Coin } from '../types/coins'
import { useQuery } from 'react-query'
import { useEffect, useState } from 'react'
import { getBookmarkFromLocalStorage } from '../utils/local-storage-utils'

export const useCoinFetch = ({ params, viewOptions }: { params: CoinsParams; viewOptions: string }) => {
  const [coinData, setCoinData] = useState<Coin[]>([])

  const { data, error, isError } = useQuery<Coin[], Error>(['coins', params], () => fetchCoins(params), {
    keepPreviousData: true, // 이전 데이터 유지
    getNextPageParam: (lastPage, allPages) => allPages.length + 1, // 페이지네이션을 위한 설정
    retry: 0,
    useErrorBoundary: true,
  })

  useEffect(() => {
    if (viewOptions === 'bookMark') {
      const bookmarkedCoinsData = getBookmarkFromLocalStorage()
      bookmarkedCoinsData ? setCoinData(bookmarkedCoinsData) : setCoinData([])
    } else {
      setCoinData(data || [])
    }
  }, [data, viewOptions])

  return { data: coinData, error, isError }
}
