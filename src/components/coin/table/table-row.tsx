import React from 'react'

interface TableRowProps {
  name: string
  symbol: string
  price: number
  change1h: number
  change24h: number
  change7d: number
  volume24h: number
}
export const TableRow = ({ name, symbol, price, change1h, change24h, change7d, volume24h }: TableRowProps) => {
  function isPositive(value: number): boolean {
    return value >= 0
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

  return (
    <tr>
      <td style={textStyle}>
        <div style={flexContainerStyle}>
          <div style={{ flexShrink: 0, height: '1.5rem', width: '1.5rem' }}>
            <span style={starStyle}>★</span>
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ ...textStyle, color: '#1f2937' }}>{name}</div>
            <div style={{ ...textStyle, color: '#6b7280', fontSize: '0.875rem' }}>{symbol}</div>
          </div>
        </div>
      </td>
      <td style={textStyle}>{price}</td>
      <td style={textStyle}>
        <span style={changeStyle(change1h)}>{change1h}%</span>
      </td>
      <td style={textStyle}>
        <span style={changeStyle(change7d)}>{change7d}%</span>
      </td>
      <td style={textStyle}>
        <span style={changeStyle(change24h)}>{change24h}%</span>
      </td>
      <td style={textStyle}>{volume24h}</td>
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
