export interface Coin {
  id: string
  symbol: string
  name: string
  current_price: number
  price_change_percentage_1h_in_currency: number
  price_change_percentage_24h_in_currency: number
  price_change_percentage_7d_in_currency: number
  description: {
    ko: string
    en: string
  }
  image: {
    large: string
    small: string
    thumb: string
  }
  links: {
    homepage: string[]
  }
  total_volume: number
  market_cap_rank: number
}

export interface CoinDetail {
  id: string
  symbol: string
  name: string
  description: {
    ko: string
    en: string
  }
  image: {
    large: string
    small: string
    thumb: string
  }
  links: {
    homepage: string[]
  }
  market_cap_rank: number
  market_data: {
    current_price: {
      krw: number
      usd: number
    }
    price_change_percentage_1h_in_currency: {
      krw: number
      usd: number
    }
    price_change_percentage_24h_in_currency: {
      krw: number
      usd: number
    }
    price_change_percentage_7d_in_currency: {
      krw: number
      usd: number
    }
    total_volume: {
      krw: number
      usd: number
    }
  }
}
