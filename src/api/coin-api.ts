const BASE_URL = 'https://api.coingecko.com/api/v3'

export const fetchCoins = async (
  currency: string,
  ids: string,
  order: string,
  perPage: number,
  page: number,
  sparkline: boolean,
  priceChangePercentage: string,
  locale: string,
) => {
  const url = new URL(`${BASE_URL}/coins/markets`)
  if (ids) url.searchParams.append('ids', ids)
  url.searchParams.append('vs_currency', currency)
  url.searchParams.append('order', order)
  url.searchParams.append('per_page', perPage.toString())
  url.searchParams.append('page', page.toString())
  url.searchParams.append('sparkline', sparkline.toString())
  url.searchParams.append('price_change_percentage', priceChangePercentage)
  url.searchParams.append('locale', locale)

  const response = await fetch(url.toString())
  if (!response.ok) {
    throw new Error('fetchCoins Network response was not ok')
  }
  return response.json()
}

export const fetchCoinsDetail = async (id: string) => {
  const url = new URL(`${BASE_URL}/coins/${id}`)
  const response = await fetch(url.toString())
  if (!response.ok) {
    throw new Error('fetchCoinsDetail Network response was not ok')
  }
  return response.json()
}
