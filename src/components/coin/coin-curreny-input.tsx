import React, { useEffect, useState } from 'react'
import switchArrowIcon from '../../../icons/switchArrowIcon.png'
import { useCoinDetailContext } from '../../context/coin-detail-context-provider'
import type { Coin } from '../../types/coins'

export const CoinCurrenyInput = ({ coins }: { coins: Coin }) => {
  const [isSwitchInput, setIsSwitchInput] = useState<string>('')
  const { currency, currencyAmount, cryptoAmount, setCurrency, setIsKrwBase, setCurrencyAmount, setCryptoAmount } =
    useCoinDetailContext()

  const isKrwBase = currency === 'krw'
  const [focused, setFocused] = useState(false)

  const handleFocus = () => setFocused(true)
  const handleBlur = () => setFocused(false)

  // 통화 입력값을 처리하는 함수입니다.
  const handleCurrencyInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (!value.startsWith('0') && !isNaN(Number(value))) {
      setCurrencyAmount(value)
      const newCryptoAmount = isKrwBase
        ? (parseFloat(value) * coins.market_data.current_price.krw).toFixed(8)
        : (parseFloat(value) * coins.market_data.current_price.usd).toFixed(8)
      setCryptoAmount(newCryptoAmount)
    }
  }
  // 암호화폐 입력값을 처리하는 함수입니다.
  const handleCryptoInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (/^\d*\.?\d{0,8}$/.test(value)) {
      setCryptoAmount(value)
      const newCurrencyAmount = isKrwBase
        ? (parseFloat(value) / coins.market_data.current_price.krw).toFixed(8)
        : (parseFloat(value) / coins.market_data.current_price.usd).toFixed(8)
      setCurrencyAmount(newCurrencyAmount)
    }
  }

  const convertCurrency = () => {
    setIsSwitchInput(isSwitchInput === 'krw' || isSwitchInput === '' ? 'bit' : 'krw')
  }

  useEffect(() => {
    if (isSwitchInput === 'krw') {
      setCryptoAmount(parseFloat(currencyAmount).toFixed(8))
      setCurrencyAmount((parseFloat(currencyAmount) / coins.market_data.current_price.krw).toFixed(8))
    } else if (isSwitchInput === 'bit') {
      setCurrencyAmount(parseFloat(cryptoAmount).toFixed(8))
      setCryptoAmount((parseFloat(cryptoAmount) * coins.market_data.current_price.krw).toFixed(8))
    }
  }, [isSwitchInput])

  return (
    <div style={styles.currencyInputContainer}>
      <div style={styles.inputTitle}>암호화폐 환전</div>
      {isSwitchInput === 'krw' || isSwitchInput === '' ? 'BTC' : 'KRW'}
      {isSwitchInput === 'krw' || isSwitchInput === '' ? 'KRW' : 'BTC'}
      <div
        style={{
          ...styles.inputWrapper,
          ...(focused ? styles.inputWrapperFocused : null),
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        <input
          style={styles.input}
          type="text"
          value={isSwitchInput === 'krw' || isSwitchInput === '' ? cryptoAmount : currencyAmount}
          onChange={
            isSwitchInput === 'krw' || isSwitchInput === '' ? handleCryptoInputChange : handleCurrencyInputChange
          }
        />

        <button style={styles.conversionButton} onClick={convertCurrency}>
          <img src={switchArrowIcon} alt="Convert" style={styles.conversionImage} />
        </button>

        <input
          style={styles.input}
          type="text"
          value={isSwitchInput === 'krw' || isSwitchInput === '' ? currencyAmount : cryptoAmount}
          onChange={
            isSwitchInput === 'krw' || isSwitchInput === '' ? handleCurrencyInputChange : handleCryptoInputChange
          }
        />
      </div>
    </div>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  currencyInputContainer: {
    display: 'flex',
    padding: '20px',
    alignItems: 'center',
    marginBottom: '20px',
    background: '#dee2e6',
    flexDirection: 'column',
    borderRadius: '2px ',
  },
  inputTitle: {
    fontWeight: '700',
    fontSize: '1.5rem',
  },
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    background: '#fff',
    border: '1px solid #d1d5db', // 기본 테두리 색상
    borderRadius: '12px',
    margin: '10px 0',
    padding: '0.5rem',
    transition: 'border-color 0.2s', // 부드러운 색상 전환 효과
  },
  inputWrapperFocused: {
    borderColor: '#10B981', // 포커스 시 테두리 색상
  },
  input: {
    flex: 1,
    fontSize: '1rem',
    border: 'none',
    outline: 'none',
    padding: '10px',
  },
  conversionButton: {
    padding: '10px 20px',
    cursor: 'pointer',
    background: 'none', // 배경을 투명하게 설정
    border: 'none', // 테두리 없음
  },
  conversionImage: {
    height: '20px', // 높이 설정
    width: '20px', // 너비 설정
  },
  currencySelect: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
}
