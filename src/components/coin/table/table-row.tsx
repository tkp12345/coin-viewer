import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BookMarkToggle } from '../../ui/book-mark-toggle'
import { useBookMarkState } from '../../../hooks/use-book-mark-state'

interface TableRowProps {
  id: string
  name: string
  symbol: string
  current_price: number
  price_change_percentage_1h_in_currency: number
  price_change_percentage_24h_in_currency: number
  price_change_percentage_7d_in_currency: number
  total_volume: number
  market_cap_rank: number
  isBookmarked: boolean
  refetch?: () => void
}

export const TableRow = ({ ...props }: TableRowProps) => {
  const navigate = useNavigate()

  //북마크 핸들링 훅스
  const { bookmarked, handleBookmarkToggle } = useBookMarkState({
    data: props,
    isBookmarked: props.isBookmarked,
    refetch: props.refetch,
  })
  const navigateCoinDetail = () => {
    navigate(`/coin/${props.id}`)
  }

  return (
    <tr>
      <td style={textStyle}>
        <div style={flexContainerStyle}>
          <BookMarkToggle checked={bookmarked} onClick={handleBookmarkToggle} />
          <div style={{ display: 'grid', gridTemplateColumns: '150px auto', gap: '10px' }}>
            <div onClick={navigateCoinDetail} style={{ ...textStyle, color: '#1f2937', cursor: 'pointer' }}>
              {props.name}
            </div>
            <div style={{ ...textStyle, color: '#6b7280', fontSize: '0.875rem' }}>{props.symbol}</div>
          </div>
        </div>
      </td>
      <td style={textStyle}>{props.current_price}</td>
      <td style={textStyle}>
        <span style={changeStyle(props.price_change_percentage_1h_in_currency)}>
          {props.price_change_percentage_1h_in_currency}%
        </span>
      </td>
      <td style={textStyle}>
        <span style={changeStyle(props.price_change_percentage_24h_in_currency)}>
          {props.price_change_percentage_24h_in_currency}%
        </span>
      </td>
      <td style={textStyle}>
        <span style={changeStyle(props.price_change_percentage_7d_in_currency)}>
          {props.price_change_percentage_7d_in_currency}%
        </span>
      </td>

      <td style={textStyle}>{props.total_volume}</td>
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
