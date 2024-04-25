import React, { useEffect, useState } from 'react'
import switchArrowIcon from '../../../icons/switchArrowIcon.png'
import coinIcon from '../../../icons/coinIcon.png'
import { useCoinDetailContext } from '../../context/coin-detail-context-provider'
import type { Coin } from '../../types/coins'
import { _currencyConvertor } from '../../utils/currency-filter'
import { useCurrencyChangeInput } from '../../hooks/use-currency-change-input'
import { SwitchInputWrap } from '../ui/switchInputWrap'

export const CoinCurrenyChangeInput = ({ coin }: { coin: Coin }) => {
  const [focusedInput, setFocusedInput] = useState(false)
  //기준 input
  const [standardInput, setStandardInput] = useState<'' | 'currency' | 'crypto'>('')

  const { symbol, image, market_data } = coin
  const { currency, currencyAmount, cryptoAmount } = useCoinDetailContext()

  //switch input 핸들러 훅스
  const { setCurrency, setCrypto, handleCurrencyInputChange, handleCryptoInputChange } = useCurrencyChangeInput({
    coin,
  })

  //input 이미지
  const cryptoInputImg = image.large
  const currencyInputImg = coinIcon

  //input 버튼이 switch(변경) 되었는지
  const isSwitchInput = standardInput === 'currency' || standardInput === ''

  //현재 기준 통화
  const prevCurrency = _currencyConvertor({ currency, marketData: market_data })

  /*
    inputSwitch 버튼을 누르면 기준 input이 변경됩니다
   */
  const inputSwitchHandler = () => {
    setStandardInput(isSwitchInput ? 'crypto' : 'currency')
  }

  /*
   기준 input (첫번쨰인풋) 값에 따라 통화, 암호화폐 값을 변경
   */
  useEffect(() => {
    const filteredCurrency: string = currencyAmount.replace(/,/g, '')
    const filteredCrypto: string = cryptoAmount.replace(/,/g, '')

    //기준 input 이 통화 일떄
    if (standardInput === 'currency') {
      setCrypto(filteredCurrency)
      setCurrency((parseFloat(filteredCurrency) / prevCurrency).toFixed(0))
      //기준 input 이 암호 화폐 일떄
    } else if (standardInput === 'crypto') {
      setCurrency(filteredCrypto)
      setCrypto((parseFloat(filteredCrypto) * prevCurrency).toFixed(2))
    }
  }, [standardInput])

  return (
    <div style={styles.currencyInputContainer}>
      <div style={styles.inputTitle}>암호화폐 환전</div>
      <div style={styles.inputWrapper}>
        {/*기준 인풋에 따라 input 변경 */}
        {isSwitchInput ? (
          <>
            <SwitchInputWrap.Input
              img={cryptoInputImg}
              title={symbol}
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
              title={symbol}
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
