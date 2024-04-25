import React, { useEffect, useState } from 'react'
import { useBookMarkState } from '../../../hooks/use-book-mark-state'
import { getBookmarkFromLocalStorage } from '../../../utils/local-storage-utils'
import type { CoinDetail } from '../../../types/coins'
import { BookMarkToggle } from '../../ui/book-mark-toggle'
import { CoinSelectWrap } from '../../ui/coin-select-button'
import { useCoinDetailContext } from '../../../context/coin-detail-context-provider'

export const CoinDetailHeader = ({ coin, id }: { coin: CoinDetail; id: string | undefined }) => {
  const { links, image, name, symbol, market_data } = coin
  const { isKrwBase, currency, setCurrency } = useCoinDetailContext()
  const [initBookMarked, setInitBookMarked] = useState(false)

  //북마크 핸들링 훅스
  const { bookmarked, handleBookmarkToggle } = useBookMarkState({
    data: {
      ...coin,
      price_change_percentage_1h_in_currency: coin.market_data.price_change_percentage_7d_in_currency.krw,
      price_change_percentage_24h_in_currency: coin.market_data.price_change_percentage_24h_in_currency.krw,
      price_change_percentage_7d_in_currency: coin.market_data.price_change_percentage_24h_in_currency.krw,
      current_price: coin.market_data.current_price.krw,
      total_volume: coin.market_data.total_volume.krw,
    },
    isBookmarked: initBookMarked,
  })

  const price_1h_currency = isKrwBase
    ? market_data.price_change_percentage_1h_in_currency?.krw
    : market_data.price_change_percentage_1h_in_currency?.usd

  //암호화폐 링크
  const cryptoLink = links?.homepage.length > 0 ? links.homepage[0] : undefined

  const TitleContent = cryptoLink ? (
    <a href={cryptoLink}>
      {name} ({symbol.toUpperCase()})
    </a>
  ) : (
    `${name} (${symbol.toUpperCase()})`
  )

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
        <h1 style={styles.title}>{TitleContent}</h1>
        <span style={changeStyle(price_1h_currency)}>{`${price_1h_currency?.toFixed(1)}%`}</span>
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
