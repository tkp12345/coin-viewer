import React, { useEffect, useState } from 'react'
import switchArrowIcon from '../../../icons/switchArrowIcon.png'
import coinIcon from '../../../icons/coinIcon.png'
import { useCoinDetailContext } from '../../context/coin-detail-context-provider'
import type { Coin } from '../../types/coins'
import { formatStringToNumber } from '../../utils/price-filter'

export const CoinCurrenyInput = ({ coin }: { coin: Coin }) => {
  const { image, market_data } = coin
  const [isSwitchInput, setIsSwitchInput] = useState<string>('')
  const { currency, currencyAmount, cryptoAmount, setCurrencyAmount, setCryptoAmount } = useCoinDetailContext()

  const isSwitch = isSwitchInput === 'curreny' || isSwitchInput === ''
  const bitCoinIcon = image.large
  const currencyIcon = coinIcon

  const isKrwBase = currency === 'krw'
  const restrictDecimalEightRegex = (value: string) => /^\d*\.?\d{0,8}$/.test(value)

  const [focused, setFocused] = useState(false)

  const handleFocus = () => setFocused(true)
  const handleBlur = () => setFocused(false)

  // 통화 입력값을 처리하는 함수입니다.
  const handleCurrencyInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (!value.startsWith('0') && !isNaN(Number(value)) && restrictDecimalEightRegex(value)) {
      setCurrencyAmount(formatStringToNumber(value))
      const newCryptoAmount = isKrwBase
        ? (parseFloat(value) * market_data.current_price.krw).toFixed(2)
        : (parseFloat(value) * market_data.current_price.usd).toFixed(2)
      setCryptoAmount(formatStringToNumber(newCryptoAmount))
    }
  }
  // 암호화폐 입력값을 처리하는 함수입니다.
  const handleCryptoInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (restrictDecimalEightRegex(value)) {
      setCryptoAmount(formatStringToNumber(value))
      const newCurrencyAmount = isKrwBase
        ? (parseFloat(value) / market_data.current_price.krw).toFixed(2)
        : (parseFloat(value) / market_data.current_price.usd).toFixed(2)
      setCurrencyAmount(formatStringToNumber(newCurrencyAmount))
    }
  }

  const convertCurrency = () => {
    setIsSwitchInput(isSwitch ? 'bit' : 'curreny')
  }

  useEffect(() => {
    if (isSwitchInput === 'curreny') {
      setCryptoAmount(formatStringToNumber(parseFloat(currencyAmount).toFixed(2)))
      setCurrencyAmount(formatStringToNumber((parseFloat(currencyAmount) / market_data.current_price.krw).toFixed(2)))
    } else if (isSwitchInput === 'bit') {
      setCurrencyAmount(formatStringToNumber(parseFloat(cryptoAmount).toFixed(2)))
      setCryptoAmount(formatStringToNumber((parseFloat(cryptoAmount) * market_data.current_price.krw).toFixed(2)))
    }
  }, [isSwitchInput])

  return (
    <div style={styles.currencyInputContainer}>
      <div style={styles.inputTitle}>암호화폐 환전</div>
      <div
        style={{
          ...styles.inputWrapper,
          ...(focused ? styles.inputWrapperFocused : null),
        }}
      >
        <div
          style={{ ...styles.inputWithIcon, ...(focused ? styles.inputWrapperFocused : null) }}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          <img src={isSwitch ? bitCoinIcon : currencyIcon} alt="Icon" style={styles.inputIcon} />
          {isSwitch ? 'BTC' : 'KRW'}

          <input
            style={styles.input}
            type="text"
            value={isSwitch ? cryptoAmount : currencyAmount}
            onChange={isSwitch ? handleCryptoInputChange : handleCurrencyInputChange}
          />
        </div>

        <button style={styles.conversionButton} onClick={convertCurrency}>
          <img src={switchArrowIcon} alt="Convert" style={styles.conversionImage} />
        </button>

        <div
          style={{ ...styles.inputWithIcon, ...(focused ? styles.inputWrapperFocused : null) }}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          <img src={isSwitch ? currencyIcon : bitCoinIcon} alt="Icon" style={styles.inputIcon} />
          {isSwitch ? 'KRW' : 'BTC'}

          <input
            style={styles.input}
            type="text"
            value={isSwitch ? currencyAmount : cryptoAmount}
            onChange={isSwitch ? handleCurrencyInputChange : handleCryptoInputChange}
          />
        </div>
      </div>
    </div>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  currencyInputContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    background: '#dee2e6',
    flexDirection: 'column',
    borderRadius: '2px ',
    padding: '1.5rem',
  },
  inputTitle: {
    fontWeight: '700',
    fontSize: '1.5rem',
    color: '#6b7280',
    marginBottom: '20px',
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  inputWrapperFocused: {
    borderColor: '#10B981',
  },
  inputWithIcon: {
    background: '#fff',
    border: '1px solid #d1d5db',
    borderRadius: '12px',
    padding: '0.5rem 0.8rem',
    transition: 'border-color 0.2s',
    color: '#6b7280',
    fontSize: '0.8rem',
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    width: '100%',
  },
  inputIcon: {
    width: '2.2rem',
    height: '2.2rem',
  },
  input: {
    flex: 1,
    fontSize: '1.5rem',
    border: 'none',
    outline: 'none',
    padding: '10px',
  },
  conversionButton: {
    cursor: 'pointer',
    margin: '-0.8rem',
    zIndex: 10,
  },
  conversionImage: {
    height: '2.5rem',
    width: '2.5rem',
  },
  currencySelect: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
}
