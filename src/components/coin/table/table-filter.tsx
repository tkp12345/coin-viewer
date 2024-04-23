import React from 'react'
import { useCoinFilterContext } from '../../../context/coin-context-provider'

const currencyOptions = [
  { value: 'usd', label: 'USD 보기' },
  { value: 'krw', label: 'KRW 보기' },
]

const perPageOptions = [
  { value: 50, label: '50개 보기' },
  { value: 30, label: '50개 보기' },
  { value: 10, label: '50개 보기' },
]
export const TableFilter = () => {
  const { currency, perPage, setCurrency, setPerPage, setPage } = useCoinFilterContext()

  const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(event.target.value)
    setPage(1) // Reset page when currency changes
  }

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(event.target.value))
    setPage(1) // Reset page when perPage changes
  }

  return (
    <div className="filter-container">
      <div>
        <Select value={currency} onChange={handleCurrencyChange} options={currencyOptions} />
        <Select value={perPage} onChange={handlePerPageChange} options={perPageOptions} />
      </div>
    </div>
  )
}

interface SelectProps {
  value: string | number
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  options: { value: string | number; label: string }[]
}

const Select: React.FC<SelectProps> = ({ value, onChange, options }) => {
  return (
    <select className="select-box" value={value} onChange={onChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}
