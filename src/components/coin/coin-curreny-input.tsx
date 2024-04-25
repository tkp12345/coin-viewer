import React, { useEffect, useState } from 'react'
import switchArrowIcon from '../../../icons/switchArrowIcon.png'
import coinIcon from '../../../icons/coinIcon.png'
import { useCoinDetailContext } from '../../context/coin-detail-context-provider'
import type { CoinDetail } from '../../types/coins'
import { _currencyConvertor } from '../../utils/currency-filter'
import { useCurrencyChangeInput } from '../../hooks/use-currency-change-input'
import { SwitchInputWrap } from '../ui/switchInputWrap'
import { useUpdateEffect } from '../../hooks/use-update-effect'

export const CoinCurrenyChangeInput = ({ coin }: { coin: CoinDetail }) => {
  const [focusedInput, setFocusedInput] = useState(false)
  //기준 input
  const [standardInput, setStandardInput] = useState<'' | 'currency' | 'crypto'>('')

  const { symbol, image, market_data } = coin
  const { currency, currencyAmount, cryptoAmount } = useCoinDetailContext()
  //현재 기준 통화
  const prevCurrency = _currencyConvertor({ currency, marketData: market_data })
  //switch input 핸들러 훅스
  const { setCurrency, setCrypto, handleCurrencyInputChange, handleCryptoInputChange } =
    useCurrencyChangeInput(prevCurrency)

  //input 이미지
  const cryptoInputImg = image.large
  const currencyInputImg = coinIcon

  //input 버튼이 switch(변경) 되었는지
  const isSwitchInput = standardInput === 'currency' || standardInput === ''

  /*
    inputSwitch 버튼을 누르면 기준 input이 변경됩니다
   */
  const inputSwitchHandler = () => {
    setStandardInput(isSwitchInput ? 'crypto' : 'currency')

    const filteredCurrency: string = currencyAmount.replace(/,/g, '')
    const filteredCrypto: string = cryptoAmount.replace(/,/g, '')

    if (standardInput === 'crypto') {
      setCrypto(filteredCurrency)
      setCurrency((parseFloat(filteredCurrency) / prevCurrency).toFixed(0))
    } else {
      setCurrency(filteredCrypto)
      setCrypto((parseFloat(filteredCrypto) * prevCurrency).toFixed(8))
    }
  }

  //화폐 초기값
  useEffect(() => {
    setCurrency(parseFloat((1 / prevCurrency).toString()).toFixed(8))
  }, [])

  //화폐 값변경에 따른 input 값 세팅
  useUpdateEffect(() => {
    const filteredCurrency: string = currencyAmount.replace(/,/g, '')
    const filteredCrypto: string = cryptoAmount.replace(/,/g, '')

    if (standardInput === 'crypto') {
      setCrypto((parseFloat(filteredCurrency) * prevCurrency).toFixed(8))
    } else {
      setCurrency((parseFloat(filteredCrypto) / prevCurrency).toFixed(0))
    }
  }, [currency])

  return (
    <div style={styles.currencyInputContainer}>
      <div style={styles.inputTitle}>암호화폐 환전</div>
      <div style={styles.inputWrapper}>
        {/*기준 인풋에 따라 input 변경 */}
        {isSwitchInput ? (
          <>
            <SwitchInputWrap.Input
              img={cryptoInputImg}
              title={symbol.toUpperCase()}
              value={cryptoAmount}
              onChange={handleCryptoInputChange}
              focused={focusedInput}
              setFocused={setFocusedInput}
            />
            <SwitchInputWrap.Button img={switchArrowIcon} onClick={inputSwitchHandler} />
            <SwitchInputWrap.Input
              img={currencyInputImg}
              title={currency.toUpperCase()}
              value={currencyAmount}
              onChange={handleCurrencyInputChange}
              focused={focusedInput}
              setFocused={setFocusedInput}
            />
          </>
        ) : (
          <>
            <SwitchInputWrap.Input
              img={currencyInputImg}
              title={currency.toUpperCase()}
              value={currencyAmount}
              onChange={handleCurrencyInputChange}
              focused={focusedInput}
              setFocused={setFocusedInput}
            />
            <SwitchInputWrap.Button img={switchArrowIcon} onClick={inputSwitchHandler} />
            <SwitchInputWrap.Input
              img={cryptoInputImg}
              title={symbol.toUpperCase()}
              value={cryptoAmount}
              onChange={handleCryptoInputChange}
              focused={focusedInput}
              setFocused={setFocusedInput}
            />
          </>
        )}
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
}
