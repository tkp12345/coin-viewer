import React, { useState } from 'react'
import type { Coin } from '../../../types/coins'

export const CoinDetailDescription = ({ coin }: { coin: Coin }) => {
  const [showDescription, setShowDescription] = useState(false) // 설명 텍스트 표시 상태

  const getDescriptionText = () => {
    const { ko, en } = coin.description
    return ko || en || ''
  }

  const toggleDescription = () => {
    setShowDescription(!showDescription)
  }

  return (
    <div style={{ width: '100%' }}>
      <button onClick={toggleDescription} style={styles.toggleButton}>
        {showDescription ? `${coin.name}  🔽` : `${coin.name} ? : ▶️`}
      </button>
      {showDescription && <p style={styles.description}>{getDescriptionText()}</p>}
    </div>
  )
}
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    width: '100%',
  },
  description: {
    color: '#6b7280',
    fontWeight: '500',
    fontSize: '0.75rem',
    marginBottom: '20px',
    textAlign: 'center',
  },
  toggleButton: {
    marginBottom: '10px',
    padding: '8px 16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    background: 'white',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
}
