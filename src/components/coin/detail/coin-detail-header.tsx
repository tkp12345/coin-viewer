import React, { useEffect, useState } from 'react'
import { useBookMarkState } from '../../../hooks/use-book-mark-state'
import { getBookmarkFromLocalStorage } from '../../../utils/local-storage-utils'
import type { Coin } from '../../../types/coins'
import { BookMarkToggle } from '../../ui/book-mark-toggle'
import { CoinSelectWrap } from '../../ui/coin-select-button'
import { useCoinDetailContext } from '../../../context/coin-detail-context-provider'

export const CoinDetailHeader = ({ coins, id }: { coins: Coin; id: string | undefined }) => {
  const [initBookMarked, setInitBookMarked] = useState(false)
  const { currency, setCurrency } = useCoinDetailContext()
  //북마크 핸들링 훅스
  const { bookmarked, handleBookmarkToggle } = useBookMarkState({
    data: coins,
    isBookmarked: initBookMarked,
  })

  useEffect(() => {
    const bookmarkedCoinsData = getBookmarkFromLocalStorage()
    if (!bookmarkedCoinsData) return

    setInitBookMarked(bookmarkedCoinsData.some((local) => local.id === id))
  }, [])
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <BookMarkToggle size={'xx-large'} checked={bookmarked} onClick={handleBookmarkToggle} />
        <img style={styles.image} src={coins.image.large} alt={coins.name} />
        <h1 style={styles.title}>
          {coins.name} ({coins.symbol.toUpperCase()})
        </h1>
        <span style={changeStyle(coins.price_change_percentage_1h_in_currency)}>
          {`${coins.price_change_percentage_1h_in_currency}%`}
        </span>
      </div>
      <CoinSelectWrap.Currency currency={currency} setCurrency={setCurrency}></CoinSelectWrap.Currency>
    </div>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  image: {
    width: '2.5rem',
    height: '2.5rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
  },
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
