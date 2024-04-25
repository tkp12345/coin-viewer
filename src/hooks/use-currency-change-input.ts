import type React from 'react'
import type { Coin } from '../types/coins'
import {
  _currencyConvertor,
  _formatNumberWithDots,
  _isValidCryptoRegex,
  _isValidCurrencyRegex,
} from '../utils/currency-filter'
import { formatStringToNumber } from '../utils/price-filter'
import { useCoinDetailContext } from '../context/coin-detail-context-provider'

export const useCurrencyChangeInput = ({ coin }: { coin: Coin }) => {
  const { market_data } = coin
  const { currency, setCurrencyAmount, setCryptoAmount } = useCoinDetailContext()

  //현재 통화가 krw 인지
  const isKrwBase = currency === 'krw'

  //현재 기준 통화
  const prevCurrency = _currencyConvertor({ currency, marketData: market_data })

  //통화 변경
  const setCurrency = (currency: string) => {
    const formatCurrency = _formatNumberWithDots(currency)
    setCurrencyAmount(formatCurrency)
  }

  //암호화폐 변경
  const setCrypto = (crypto: string) => {
    const formatCrypro = _formatNumberWithDots(crypto)
    setCryptoAmount(formatCrypro)
  }

  //빈값 입력시 통화,암호화폐 초기화
  const initInputValue = () => {
    setCryptoAmount('')
    setCurrencyAmount('')
  }

  /*
   통화 입력값 Input handler
   */
  const handleCurrencyInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value
    if (rawValue === '') return initInputValue()
    const value = rawValue.replace(/,/g, '') // 점을 제거하고 포맷팅

    if (value.startsWith('0') || isNaN(Number(value)) || !_isValidCurrencyRegex(value)) return

    setCurrency(value)

    const newCryptoAmount = isKrwBase
      ? (parseFloat(value) * market_data.current_price.krw).toFixed(2)
      : (parseFloat(value) * market_data.current_price.usd).toFixed(2)
    setCrypto(formatStringToNumber(newCryptoAmount))
  }

  /*
암호화폐 입력값 Input handler
*/
  const handleCryptoInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value
    if (rawValue === '') return initInputValue()
    const value = rawValue.replace(/,/g, '') // 점을 제거하고 포맷팅

    if (isNaN(Number(value)) || !_isValidCryptoRegex(value)) return

    setCrypto(value)

    const newCurrencyAmount = (parseFloat(value) / prevCurrency).toFixed(0)
    setCurrency(formatStringToNumber(newCurrencyAmount))
  }

  return {
    setCurrency,
    setCrypto,
    handleCurrencyInputChange,
    handleCryptoInputChange,
  }
}
