import React, { useEffect, useState } from 'react'
import type { Coin } from '../../types/coins'
import { getBookmarkFromLocalStorage } from '../../utils/local-storage-utils'
import { Table } from './table/table'
import { TableHeader } from './table/table-header'
import { TableRow } from './table/table-row'

export const BookMarkList = () => {
  const [bookmarkList, setBookmarkList] = useState<Coin[]>([])

  //북마크 조회
  const fetchBookMark = () => {
    const bookmarkedCoins = getBookmarkFromLocalStorage()
    if (!bookmarkedCoins) return
    const rangedBookmarkedCoins = bookmarkedCoins.sort((a, b) => a.market_cap_rank - b.market_cap_rank)
    setBookmarkList(rangedBookmarkedCoins)
  }

  useEffect(() => {
    fetchBookMark()
  }, [])
  return (
    <div>
      <Table>
        <TableHeader headerOptions={['자산', 'Price', '1H', '24H', '7D', '24H Volume']} />
        <tbody style={{ backgroundColor: 'white', borderTop: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb' }}>
          {bookmarkList.map((coin) => (
            <TableRow key={coin.id} coin={coin} isBookmarked={true} currency={'krw'} refetch={fetchBookMark} />
          ))}
        </tbody>
      </Table>
    </div>
  )
}
