import React, { useEffect, useState } from 'react'
import { setBookmarkFromLocalStorage } from '../../../utils/local-storage-utils'
import debounce from '../../../utils/debounce'

interface TableRowProps {
  id: string
  name: string
  symbol: string
  current_price: number
  price_change_percentage_1h_in_currency: number
  price_change_percentage_24h_in_currency: number
  price_change_percentage_7d_in_currency: number
  total_volume: number
  isBookmarked: boolean
}

export const TableRow = ({ ...props }: TableRowProps) => {
  const [bookmarked, setBookmarked] = useState<boolean>(props.isBookmarked)

  const handleBookmarkToggle = debounce(() => {
    setBookmarked(!bookmarked)
    setBookmarkFromLocalStorage(props, bookmarked)
  }, 300)

  useEffect(() => {
    setBookmarked(props.isBookmarked)
  }, [props.isBookmarked])

  return (
    <tr>
      <td style={textStyle}>
        <div style={flexContainerStyle}>
          <div
            style={{
              flexShrink: 0,
              height: '1.5rem',
              width: '1.5rem',
              cursor: 'pointer',
            }}
            onClick={() => handleBookmarkToggle()}
          >
            <span
              style={{
                ...starStyle,
                color: bookmarked ? '#f59e0b' : '#D1D5DB',
              }}
            >
              ★
            </span>{' '}
            {/* isBookmarked 상태에 따라 별의 색깔이 바뀜 */}
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ ...textStyle, color: '#1f2937' }}>{props.name}</div>
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

const starStyle: React.CSSProperties = {
  color: '#f59e0b',
  marginRight: '1rem',
}

const changeStyle = (value: number) => ({
  padding: '0.5rem',
  display: 'inline-flex',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  fontWeight: '600',
  borderRadius: '0.5rem',
  backgroundColor: isPositive(value) ? '#ccffcc' : '#ffcccc',
  color: isPositive(value) ? '#1f7a1f' : '#991b1b',
})

function isPositive(value: number): boolean {
  return value >= 0
}
