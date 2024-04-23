import type { PropsWithChildren, ReactNode } from 'react'
import React, { createContext, useContext, useState } from 'react'

type coinFilterContextType = {
  viewOptions: string
  currency: string
  perPage: number
  page: number
  setViewOptions: React.Dispatch<React.SetStateAction<string>>
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
  const [viewOptions, setViewOptions] = useState<string>('all')
  const [currency, setCurrency] = useState<string>('krw')
  const [perPage, setPerPage] = useState<number>(50)
  const [page, setPage] = useState<number>(1)

  const value = {
    viewOptions,
    currency,
    perPage,
    page,
    setViewOptions,
    setCurrency,
    setPerPage,
    setPage,
  }

  return <coinFilterContext.Provider value={value}>{children}</coinFilterContext.Provider>
}
