import React from 'react'
import { currencyFilter } from '../../../utils/currency-filter'
import type { Coin } from '../../../types/coins'
import { useCoinDetailContext } from '../../../context/coin-detail-context-provider'

export const CoinDetailSubSection = ({ coins }: { coins: Coin }) => {
  const { currency, setCurrency } = useCoinDetailContext()
  const currentPrice =
    currency === 'krw' ? coins.market_data.current_price.krw.toFixed(2) : coins.market_data.current_price.usd.toFixed(2)
  const getCoinPriceTitle = () => {
    return `1 ${coins.symbol.toUpperCase()} = ${currencyFilter(currency)} ${currentPrice}  ${currency.toUpperCase()}`
  }

  const getCoinPriceDescription = () => {
    return `${coins.symbol.toUpperCase()} 실시간 가격은 ${currentPrice}입니다. 즉, 1 ${currency.toUpperCase()}로 ${currentPrice} ${coins.symbol.toUpperCase()}을(를) 구매할 수 있습니다`
  }

  return (
    <div style={{ padding: '2rem' }}>
      {<p style={styles.priceDescriptionTitle}>{getCoinPriceTitle()}</p>}
      {<p style={styles.priceDescription}>{getCoinPriceDescription()}</p>}
    </div>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  priceDescriptionTitle: {
    color: '#868e96',
    fontWeight: '700',
    fontSize: '2rem',
    marginBottom: '20px',
  },
  priceDescription: {
    color: '#6b7280',
    fontWeight: '500',
    fontSize: '1rem',
    marginBottom: '20px',
  },
}
