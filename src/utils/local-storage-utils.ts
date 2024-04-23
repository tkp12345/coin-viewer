import type { Coin } from '../types/coins'
import { _toast } from './toastify-options'

const COIN_LOCAL_STORAGE_SYMBOL = 'coinBookMark'
export const setBookmarkFromLocalStorage = (coin: Coin, isBookMarked: boolean) => {
  try {
    const bookmarkedCoinsData = localStorage.getItem(COIN_LOCAL_STORAGE_SYMBOL)

    let bookmarkedCoins: Coin[] = []
    if (bookmarkedCoinsData !== null) {
      bookmarkedCoins = JSON.parse(bookmarkedCoinsData)
    }

    if (!isBookMarked) {
      // Add coin data to local storage
      bookmarkedCoins.push(coin)
      localStorage.setItem(COIN_LOCAL_STORAGE_SYMBOL, JSON.stringify(bookmarkedCoins))
      _toast.success('북마크가 추가되었습니다.')
    } else {
      // Remove coin data from local storage
      const updatedBookmarkedCoins = bookmarkedCoins.filter((bookmarkedCoin) => bookmarkedCoin.id !== coin.id)
      localStorage.setItem(COIN_LOCAL_STORAGE_SYMBOL, JSON.stringify(updatedBookmarkedCoins))
      _toast.success('북마크가 해제되었습니다.')
    }
  } catch (err) {
    _toast.error('북마크 수정에 실패했습니다.')
  }
}

export const getBookmarkFromLocalStorage = () => {
  const bookmarkedCoins: Coin[] = []
  const coinBookmarkData = localStorage.getItem(COIN_LOCAL_STORAGE_SYMBOL)
  console.log('coinBookmarkData:', coinBookmarkData)
  if (coinBookmarkData === null || coinBookmarkData === undefined) return // 로컬스토리지 정보가 없는 경우 반환
  try {
    const bookmarkedCoinsData = JSON.parse(coinBookmarkData)
    bookmarkedCoins.push(...bookmarkedCoinsData) // spread operator를 사용하여 배열을 펼쳐서 추가
    console.log('bookmarkedCoins:', bookmarkedCoins)
    return bookmarkedCoins
  } catch (err) {
    _toast.success('북마크 조회에 실패했습니다.')
    return []
  }
}
