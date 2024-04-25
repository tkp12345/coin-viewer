import type { CoinsParams } from '../api/coin-api'
import { fetchCoins } from '../api/coin-api'
import type { Coin } from '../types/coins'
import { useQuery } from 'react-query'
import { useEffect, useState } from 'react'
import { getBookmarkFromLocalStorage } from '../utils/local-storage-utils'

export const useCoinFetch = ({ params, viewOptions }: { params: CoinsParams; viewOptions: string }) => {
  const [coinData, setCoinData] = useState<Coin[]>([])

  const { data, error } = useQuery<Coin[], Error>(['coins', params], () => fetchCoins(params), {
    keepPreviousData: true, // 이전 데이터 유지
    getNextPageParam: (lastPage, allPages) => allPages.length + 1, // 페이지네이션을 위한 설정
  })

  // 새 데이터가 로드될 때마다 기존 데이터에 추가
  useEffect(() => {
    if (data) {
      setCoinData((prev) => [...prev, ...data])
    }
  }, [data])

  useEffect(() => {
    if (viewOptions === 'bookMark') {
      const bookmarkedCoinsData = getBookmarkFromLocalStorage()
      if (bookmarkedCoinsData) return setCoinData(bookmarkedCoinsData)
      setCoinData([])
    }
  }, [data, viewOptions])

  return { data: coinData, error }
}
