export interface Coin {
  id: string
  symbol: string
  name: string
  current_price: number
  price_change_percentage_1h_in_currency: number
  price_change_percentage_24h_in_currency: number
  price_change_percentage_7d_in_currency: number
  total_volume: number
}
