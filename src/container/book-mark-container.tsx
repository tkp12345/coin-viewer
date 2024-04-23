import React from 'react'
import { AsyncBoundary } from '../../lib/utils/error/async-boundary'
import { BookMarkList } from '../components/coin/book-mark-list'

export const BookMarkContainer = () => {
  return (
    <AsyncBoundary>
      <BookMarkList />
    </AsyncBoundary>
  )
}