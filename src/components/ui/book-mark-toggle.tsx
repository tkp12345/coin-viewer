import React from 'react'

interface BookmarkToggleProps {
  checked: boolean
  onClick: () => void
  size?: 'xx-large' | 'x-large' | 'x-small'
}
export const BookMarkToggle = ({ size, checked, onClick }: BookmarkToggleProps) => {
  return (
    <div
      style={{
        flexShrink: 0,
        height: '1.5rem',
        width: '1.5rem',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onClick={onClick}
    >
      <span style={{ ...starStyle, color: checked ? '#f59e0b' : '#D1D5DB', fontSize: size ? size : 'large' }}>★</span>
    </div>
  )
}

const starStyle: React.CSSProperties = {
  color: '#f59e0b',
}
