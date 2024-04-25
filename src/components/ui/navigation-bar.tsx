import React from 'react'
import { useNavigate } from 'react-router-dom'

export const NavigationBar = ({ id }: { id: string | undefined }) => {
  const navigate = useNavigate()

  const navigateHome = () => {
    navigate('/')
  }

  const navigateCoinDetail = () => {
    navigate(`/coin/${id}`)
  }
  return (
    <nav style={styles.nav}>
      <ul style={styles.navList}>
        <li style={styles.navItem} onClick={navigateHome}>
          홈
        </li>
        {id && (
          <>
            <li style={styles.separator}>{'>'}</li>
            <li style={styles.navItem} onClick={navigateCoinDetail}>
              {id.toUpperCase()}
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  nav: {
    backgroundColor: '#dee2e6', // 네비게이션 바의 배경 색상
    padding: '10px 20px',
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    alignItems: 'center',
    padding: 0,
    fontWeight: 500,
  },
  navItem: {
    marginRight: '2px',
    color: '#495057',
    cursor: 'pointer',
    textDecoration: 'none',
    padding: '5px 10px',
    fontSize: '16px',
  },
  separator: {
    margin: '0 5px',
    color: '#333',
  },
  icon: {
    width: '20px',
    marginRight: '5px',
  },
}
