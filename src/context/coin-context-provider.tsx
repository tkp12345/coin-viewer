import type { PropsWithChildren, ReactNode } from 'react'
import React, { createContext, useContext, useState } from 'react'

type coinFilterContextType = {
  currency: string
  perPage: number
  page: number
  setCurrency: React.Dispatch<React.SetStateAction<string>>
  setPerPage: React.Dispatch<React.SetStateAction<number>>
  setPage: React.Dispatch<React.SetStateAction<number>>
}

const coinFilterContext = createContext<coinFilterContextType | undefined>(undefined)

export const useCoinFilterContext = () => {
  const context = useContext(coinFilterContext)
  if (!context) {
    throw new Error('use FilterProvider')
  }
  return context
}

export const CoinFilterContextProvider = ({ children }: PropsWithChildren<ReactNode>) => {
  const [currency, setCurrency] = useState<string>('krw')
  const [perPage, setPerPage] = useState<number>(50)
  const [page, setPage] = useState<number>(1)

  const value = {
    currency,
    perPage,
    page,
    setCurrency,
    setPerPage,
    setPage,
  }

  return <coinFilterContext.Provider value={value}>{children}</coinFilterContext.Provider>
}
