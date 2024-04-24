import React, { useState } from 'react'
import { CoinContainer } from '../../container/coin-container'
import { BookMarkContainer } from '../../container/book-mark-container'

export const CoinGnb = () => {
  const [activeTab, setActiveTab] = useState('coinList')

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName)
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        <button onClick={() => handleTabClick('coinList')} style={activeTab === 'coinList' ? activeTabStyle : tabStyle}>
          가상자산 시세목록
        </button>
        <button
          onClick={() => handleTabClick('bookmarkList')}
          style={activeTab === 'bookmarkList' ? activeTabStyle : tabStyle}
        >
          북마크 목록
        </button>
      </div>
      <div style={{ backgroundColor: '#FFFFFF', padding: '20px' }}>
        {activeTab === 'coinList' && <CoinContainer />}
        {activeTab === 'bookmarkList' && <BookMarkContainer />}
      </div>
    </div>
  )
}

const tabStyle = {
  width: '100%',
  padding: '10px 20px',
  cursor: 'pointer',
  border: 'none',
  borderBottom: '3px solid transparent',
  borderBottomColor: 'white',
  backgroundColor: '#dee2e6',
  boxShadow: '2px 0 5px rgba(0, 0, 0, 0.2)',
}

const activeTabStyle = {
  ...tabStyle,
  borderBottomColor: 'white',
  backgroundColor: 'white',
}
