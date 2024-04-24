import { useEffect, useState } from 'react'
import { fetchCoinsDetail } from '../api/coin-api'
import type { Coin } from '../types/coins'

export const useCoinDetailFetch = (id: string | undefined) => {
  const [data, setData] = useState<Coin[]>([])

  const fetchData = async () => {
    if (!id) return setData([])

    try {
      const result = await fetchCoinsDetail(id)
      setData(result)
    } catch (error) {
      throw Error()
    }
  }

  useEffect(() => {
    fetchData()
  }, [id])

  return { data }
}
