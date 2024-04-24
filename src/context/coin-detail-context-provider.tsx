import type { PropsWithChildren, ReactNode } from 'react'
import React from 'react'
import { createContext, useContext, useState } from 'react'

interface CoinDetailContextState {
  currencyAmount: string
  setCurrencyAmount: (amount: string) => void
  cryptoAmount: string
  setCryptoAmount: (amount: string) => void
  isKrwBase: boolean
  setIsKrwBase: (isKrwBase: boolean) => void
  currency: string
  setCurrency: (currency: string) => void
  toggleCurrencyBase: () => void
}

const CoinDetailContext = createContext<CoinDetailContextState | undefined>(undefined)

export const useCoinDetailContext = () => {
  const context = useContext(CoinDetailContext)
  if (context === undefined) {
    throw new Error('useCoinDetail must be used within a CoinDetailProvider')
  }
  return context
}

export const CoinDetailProvider = ({ children }: PropsWithChildren<ReactNode>) => {
  const [currencyAmount, setCurrencyAmount] = useState('')
  const [cryptoAmount, setCryptoAmount] = useState('1')
  const [isKrwBase, setIsKrwBase] = useState(true)
  const [currency, setCurrency] = useState('krw')

  const toggleCurrencyBase = () => {
    setIsKrwBase(!isKrwBase)
  }

  return (
    <CoinDetailContext.Provider
      value={{
        currencyAmount,
        setCurrencyAmount,
        cryptoAmount,
        setCryptoAmount,
        isKrwBase,
        setIsKrwBase,
        currency,
        setCurrency,
        toggleCurrencyBase,
      }}
    >
      {children}
    </CoinDetailContext.Provider>
  )
}
