import React, { useEffect, useState } from 'react'
import { useBookMarkState } from '../../../hooks/use-book-mark-state'
import { getBookmarkFromLocalStorage } from '../../../utils/local-storage-utils'
import type { Coin } from '../../../types/coins'
import { BookMarkToggle } from '../../ui/book-mark-toggle'
import { CoinSelectWrap } from '../../ui/coin-select-button'
import { useCoinDetailContext } from '../../../context/coin-detail-context-provider'

export const CoinDetailHeader = ({ coin, id }: { coin: Coin; id: string | undefined }) => {
  const { image, name, symbol, price_change_percentage_1h_in_currency } = coin
  const { currency, setCurrency } = useCoinDetailContext()
  const [initBookMarked, setInitBookMarked] = useState(false)

  //북마크 핸들링 훅스
  const { bookmarked, handleBookmarkToggle } = useBookMarkState({
    data: coin,
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
        <img style={styles.image} src={image.large} alt={name} />
        <h1 style={styles.title}>
          {name} ({symbol.toUpperCase()})
        </h1>
        <span style={changeStyle(price_change_percentage_1h_in_currency)}>
          {`${price_change_percentage_1h_in_currency.toFixed(1)}%`}
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
