import { useParams } from 'react-router-dom'
import { API_DETAIL_DATA } from '../../../mock/mock'
import { CoinCurrenyInput } from '../coin-curreny-input'
import type { Coin } from '../../../types/coins'
import React from 'react'
import { CoinDetailHeader } from './coin-detail-header'
import { CoinDetailSubSection } from './coin-detail-sub-section'

export const CoinDetail = () => {
  const { id } = useParams()

  // const { data: coins } = useCoinDetailFetch(id)
  const coins = API_DETAIL_DATA as Coin
  const getDescriptionText = () => {
    const { ko, en } = coins.description
    return ko || en || ''
  }

  return (
    <div style={styles.container}>
      <div style={{ width: '100%' }}>
        <CoinDetailHeader coins={coins} id={id} />
        <CoinDetailSubSection coins={coins} />
        <CoinCurrenyInput coins={coins} />
      </div>
      {getDescriptionText() && <p style={styles.description}>{getDescriptionText()}</p>}
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
  },
  currencyInput: {
    marginRight: '10px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
}
