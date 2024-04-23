import React from 'react'
import { useParams } from 'react-router-dom'

export const CoinDetailContainer = () => {
  let { id } = useParams()
  console.log(id)
  return <div></div>
}
