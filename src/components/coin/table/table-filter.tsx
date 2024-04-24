import React from 'react'
import { useCoinFilterContext } from '../../../context/coin-context-provider'
import { CoinSelectWrap } from '../../ui/coin-select-button'

export const TableFilter = () => {
  const { viewOptions, currency, perPage, setViewOptions, setCurrency, setPerPage, setPage } = useCoinFilterContext()

  return (
    <div className="filter-container">
      <div>
        <CoinSelectWrap.ViewOptions viewOptions={viewOptions} setViewOptions={setViewOptions} />
        <CoinSelectWrap.Currency currency={currency} setCurrency={setCurrency} />
        <CoinSelectWrap.PerPage perPage={perPage} setPerPage={setPerPage} />
      </div>
    </div>
  )
}
