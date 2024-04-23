import React from 'react'
import { Table } from './table/table'
import { TableHeader } from './table/table-header'
import { TableRow } from './table/table-row'
import { API_DATA } from '../../mock/mock'
import { TableFilter } from './table/table-filter'
import { useCoinFilterContext } from '../../context/coin-context-provider'

export const CoinList = () => {
  const { currency, perPage, page, setCurrency, setPerPage, setPage } = useCoinFilterContext()

  // const { data: coins, error } = useCoinFetch(currency, '', 'market_cap_desc', perPage, page, false, '1h,24h,7d', 'en')
  const handleLoadMore = () => {
    setPage(page + 1) // Increment page when "Load More" button is clicked
  }

  const coins = API_DATA
  return (
    <div>
      <TableFilter />
      <Table>
        <TableHeader headerOptions={['자산', 'Price', '1H', '24H', '7D', '24H Volume']} />
        <tbody style={{ backgroundColor: 'white', borderTop: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb' }}>
          {coins.map((coin) => (
            <TableRow
              key={coin.id}
              name={coin.name}
              symbol={coin.symbol}
              price={coin.current_price}
              change1h={coin.price_change_percentage_1h_in_currency}
              change24h={coin.price_change_percentage_24h_in_currency}
              change7d={coin.price_change_percentage_7d_in_currency}
              volume24h={coin.total_volume}
            />
          ))}
        </tbody>
      </Table>
      <button onClick={handleLoadMore}>Load More</button>
    </div>
  )
}
