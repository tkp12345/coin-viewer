import type React from 'react'
import {
  _formatDecimal,
  _formatNumberWithDots,
  _isValidCryptoRegex,
  _isValidCurrencyRegex,
} from '../utils/currency-filter'
import { useCoinDetailContext } from '../context/coin-detail-context-provider'

export const useCurrencyChangeInput = (prevCurrency: number) => {
  const { setCurrencyAmount, setCryptoAmount } = useCoinDetailContext()

  //통화 변경
  const setCurrency = (currency: string) => {
    const formatCurrency = _formatNumberWithDots(_formatDecimal(currency))
    setCurrencyAmount(formatCurrency)
  }

  //암호화폐 변경
  const setCrypto = (crypto: string) => {
    const formatCrypto = _formatNumberWithDots(_formatDecimal(crypto))
    setCryptoAmount(formatCrypto)
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
    const newCryptoAmount = (parseFloat(value) * prevCurrency).toFixed(2)

    setCrypto(newCryptoAmount)
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
    setCurrency(newCurrencyAmount)
  }

  return {
    setCurrency,
    setCrypto,
    handleCurrencyInputChange,
    handleCryptoInputChange,
  }
}
