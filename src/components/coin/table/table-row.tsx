import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BookMarkToggle } from '../../ui/book-mark-toggle'
import { useBookMarkState } from '../../../hooks/use-book-mark-state'
import { _currencyFilter } from '../../../utils/currency-filter'
import type { Coin } from '../../../types/coins'

interface TableRowProps {
  coin: Coin
  isBookmarked: boolean
  currency: string
  refetch?: () => void
}

export const TableRow = ({ ...props }: TableRowProps) => {
  const navigate = useNavigate()
  const navigateCoinDetail = () => {
    navigate(`/coin/${id}`)
  }
  const {
    id,
    name,
    symbol,
    current_price,
    price_change_percentage_1h_in_currency,
    price_change_percentage_24h_in_currency,
    price_change_percentage_7d_in_currency,
    total_volume,
  } = props.coin
  //북마크 등록 핸들링 훅스
  const { bookmarked, handleBookmarkToggle } = useBookMarkState({
    data: props.coin,
    isBookmarked: props.isBookmarked,
    refetch: props.refetch,
  })

  return (
    <tr>
      <td style={textStyle}>
        <div style={flexContainerStyle}>
          <BookMarkToggle checked={bookmarked} onClick={handleBookmarkToggle} />
          <div style={{ display: 'grid', gridTemplateColumns: '150px auto', gap: '10px' }}>
            <div onClick={navigateCoinDetail} style={{ ...textStyle, color: '#1f2937', cursor: 'pointer' }}>
              {name}
            </div>
            <div style={{ ...textStyle, color: '#6b7280', fontSize: '0.875rem' }}>{symbol}</div>
          </div>
        </div>
      </td>
      <td style={textStyle}>
        {`${_currencyFilter(props.currency)}${current_price?.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`}
      </td>
      <td style={textStyle}>
        <span style={changeStyle(price_change_percentage_1h_in_currency)}>
          {price_change_percentage_1h_in_currency?.toFixed(1)}%
        </span>
      </td>
      <td style={textStyle}>
        <span style={changeStyle(price_change_percentage_24h_in_currency)}>
          {price_change_percentage_24h_in_currency?.toFixed(1)}%
        </span>
      </td>
      <td style={textStyle}>
        <span style={changeStyle(price_change_percentage_7d_in_currency)}>
          {price_change_percentage_7d_in_currency?.toFixed(1)}%
        </span>
      </td>

      <td style={textStyle}>
        {`${_currencyFilter(props.currency)}${total_volume.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`}
      </td>
    </tr>
  )
}

const textStyle: React.CSSProperties = {
  paddingLeft: '1.5rem',
  paddingRight: '1.5rem',
  paddingTop: '1rem',
  paddingBottom: '1rem',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  fontWeight: 500,
  color: '#374151',
  whiteSpace: 'nowrap',
  verticalAlign: 'middle',
}

const flexContainerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
}

const changeStyle = (value: number) => ({
  padding: '0.5rem',
  display: 'inline-flex',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  fontWeight: '600',
  borderRadius: '0.5rem',
  backgroundColor: value >= 0 ? '#ccffcc' : '#ffcccc',
  color: value >= 0 ? '#1f7a1f' : '#991b1b',
})
