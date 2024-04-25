import React from 'react'
import { _currencyConvertor, _currencyFilter } from '../../../utils/currency-filter'
import type { Coin } from '../../../types/coins'
import { useCoinDetailContext } from '../../../context/coin-detail-context-provider'

export const CoinDetailSubSection = ({ coin }: { coin: Coin }) => {
  const { market_data, symbol } = coin
  const { currency } = useCoinDetailContext()

  const currentPrice = _currencyConvertor({ currency, marketData: market_data }).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  const getCoinPriceTitle = () => {
    return `1 ${symbol.toUpperCase()} = ${_currencyFilter(currency)} ${currentPrice}  ${currency.toUpperCase()}`
  }

  const getCoinPriceDescription = () => {
    return `${symbol.toUpperCase()} 실시간 가격은 ${_currencyFilter(currency)} ${currentPrice}입니다. 즉, 1 ${currency.toUpperCase()}로 ${currentPrice} ${symbol.toUpperCase()}을(를) 구매할 수 있습니다`
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
