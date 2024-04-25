import { fetchCoinsDetail } from '../api/coin-api'
import type { CoinDetail } from '../types/coins'
import { useQuery } from 'react-query'

export const useCoinDetailFetch = (id: string | undefined) => {
  return useQuery<CoinDetail, Error>(['coinDetails', id], () => fetchCoinsDetail(id ?? ''), { enabled: !!id })
}
