import { useEffect, useState } from 'react'
import debounce from '../utils/debounce'
import { setBookmarkFromLocalStorage } from '../utils/local-storage-utils'
import type { Coin } from '../types/coins'

interface useBookMarkStateProps {
  data: Coin
  isBookmarked: boolean
  refetch?: (() => void) | undefined
}
export const useBookMarkState = ({ data, isBookmarked, refetch }: useBookMarkStateProps) => {
  const [bookmarked, setBookmarked] = useState<boolean>(isBookmarked)

  const handleBookmarkToggle = debounce(() => {
    setBookmarked(!bookmarked)
    setBookmarkFromLocalStorage(data, bookmarked)
    refetch && refetch()
  }, 300)

  useEffect(() => {
    setBookmarked(isBookmarked)
  }, [isBookmarked])

  return { bookmarked, handleBookmarkToggle }
}
