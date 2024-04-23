import React, { useEffect, useState } from 'react'
import { Table } from './table/table'
import { TableHeader } from './table/table-header'
import { TableRow } from './table/table-row'
import { API_DATA } from '../../mock/mock'
import { TableFilter } from './table/table-filter'
import { useCoinFilterContext } from '../../context/coin-context-provider'
import { getBookmarkFromLocalStorage } from '../../utils/local-storage-utils'
import type { Coin } from '../../types/coins'
import { useCoinFetch } from '../../hooks/use-coin-fetch'

export const CoinList = () => {
  const { viewOptions, currency, perPage, page, setCurrency, setPerPage, setPage } = useCoinFilterContext()
  const [bookmarkedCoins, setBookmarkedCoins] = useState<Coin[]>([])

  // const { data: coins, error } = useCoinFetch(
  //   viewOptions,
  //   currency,
  //   '',
  //   'market_cap_desc',
  //   perPage,
  //   page,
  //   false,
  //   '1h,24h,7d',
  //   'kr',
  // )
  const handleLoadMore = () => {
    setPage(page + 1)
  }

  //북마크 조회
  useEffect(() => {
    const bookmarkedCoinsData = getBookmarkFromLocalStorage()
    if (!bookmarkedCoinsData) return
    setBookmarkedCoins(bookmarkedCoinsData)
  }, [])

  const coins = API_DATA
  return (
    <div>
      <TableFilter />
      <Table>
        <TableHeader headerOptions={['자산', 'Price', '1H', '24H', '7D', '24H Volume']} />
        <tbody style={{ backgroundColor: 'white', borderTop: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb' }}>
          {coins.map((coin) => (
            <TableRow
              id={coin.id}
              key={coin.id}
              name={coin.name}
              symbol={coin.symbol}
              current_price={coin.current_price}
              price_change_percentage_1h_in_currency={coin.price_change_percentage_1h_in_currency}
              price_change_percentage_24h_in_currency={coin.price_change_percentage_24h_in_currency}
              price_change_percentage_7d_in_currency={coin.price_change_percentage_7d_in_currency}
              market_cap_rank={coin.market_cap_rank}
              total_volume={coin.total_volume}
              isBookmarked={bookmarkedCoins?.some((bookmarkedCoin) => bookmarkedCoin.id === coin.id)}
            />
          ))}
        </tbody>
      </Table>
      <div style={LoadMoreButton}>
        <button style={{ width: '100%' }} onClick={handleLoadMore}>
          + 더보기
        </button>
      </div>
    </div>
  )
}

const LoadMoreButton: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '3em',
  width: '100vw',
  fontSize: '0.75rem',
  fontWeight: '500',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  boxShadow:
    'rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px',
}
