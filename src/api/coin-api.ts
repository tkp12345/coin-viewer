import type { Coin, CoinDetail } from '../types/coins'
import { _toast } from '../utils/toastify-options'

const BASE_URL = 'https://api.coingecko.com/api/v3'
export interface CoinsParams {
  currency: string
  ids: string
  order: string
  perPage: number
  page: number
  sparkline: boolean
  priceChangePercentage: string
}
// fetchCoins 함수
export const fetchCoins = async ({
  currency,
  ids,
  order,
  perPage,
  page,
  sparkline,
  priceChangePercentage,
}: CoinsParams): Promise<Coin[]> => {
  const url = new URL(`${BASE_URL}/coins/markets`)
  url.searchParams.append('vs_currency', currency)
  url.searchParams.append('order', order)
  url.searchParams.append('per_page', perPage.toString())
  url.searchParams.append('page', page.toString())
  url.searchParams.append('sparkline', sparkline.toString())
  url.searchParams.append('price_change_percentage', priceChangePercentage)
  if (ids) url.searchParams.append('ids', ids)
  try {
    const response = await fetch(url.toString())
    if (!response.ok) {
      const errorDetails = await response.json()
      throw new Error(errorDetails)
    }
    return response.json()
  } catch (error) {
    throw error
  }
}

export const fetchCoinsDetail = async (id: string): Promise<CoinDetail> => {
  const url = new URL(`${BASE_URL}/coins/${id}`)
  try {
    const response = await fetch(url.toString())
    if (!response.ok) {
      const errorDetails = await response.json()
      throw new Error(errorDetails)
    }
    return response.json()
  } catch (error) {
    throw error
  }
}
