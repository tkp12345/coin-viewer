import React from 'react'

const dataViewOptions = [
  { value: 'all', label: '전체보기' },
  { value: 'bookMark', label: '북마크보기' },
]

const currencyOptions = [
  { value: 'usd', label: 'USD 보기' },
  { value: 'krw', label: 'KRW 보기' },
]

const perPageOptions = [
  { value: 50, label: '50개 보기' },
  { value: 30, label: '50개 보기' },
  { value: 10, label: '50개 보기' },
]
const ViewOptions = ({
  viewOptions,
  setViewOptions,
}: {
  viewOptions: string
  setViewOptions: (option: string) => void
}) => {
  const handleViewOptionsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setViewOptions(event.target.value)
  }

  return <Select value={viewOptions} onChange={handleViewOptionsChange} options={dataViewOptions} />
}

const Currency = ({ currency, setCurrency }: { currency: string; setCurrency: (currency: string) => void }) => {
  const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(event.target.value)
  }
  return <Select value={currency} onChange={handleCurrencyChange} options={currencyOptions} />
}

const PerPage = ({ perPage, setPerPage }: { perPage: number; setPerPage: (perPage: number) => void }) => {
  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(event.target.value))
  }
  return <Select value={perPage} onChange={handlePerPageChange} options={perPageOptions} />
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
export const CoinSelectWrap = {
  ViewOptions: ViewOptions,
  Currency: Currency,
  PerPage: PerPage,
}
