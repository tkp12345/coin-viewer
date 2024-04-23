import React, { useEffect, useState } from 'react'
import { Table } from './table/table'
import { TableHeader } from './table/table-header'
import { TableRow } from './table/table-row'
import { API_DATA } from '../../mock/mock'
import { TableFilter } from './table/table-filter'
import { useCoinFilterContext } from '../../context/coin-context-provider'
import { getBookmarkFromLocalStorage } from '../../utils/local-storage-utils'
import type { Coin } from '../../types/coins'

export const CoinList = () => {
  const { currency, perPage, page, setCurrency, setPerPage, setPage } = useCoinFilterContext()
  const [bookmarkedCoins, setBookmarkedCoins] = useState<Coin[]>([])

  // const { data: coins, error } = useCoinFetch(currency, '', 'market_cap_desc', perPage, page, false, '1h,24h,7d', 'en')
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
              total_volume={coin.total_volume}
              isBookmarked={bookmarkedCoins?.some((bookmarkedCoin) => bookmarkedCoin.id === coin.id)}
            />
          ))}
        </tbody>
      </Table>
      <button onClick={handleLoadMore}>Load More</button>
    </div>
  )
}
