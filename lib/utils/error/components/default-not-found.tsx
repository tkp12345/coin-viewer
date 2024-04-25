import React from 'react'
import { useNavigate } from 'react-router-dom'

export const DefaultNotFound = () => {
  const navigate = useNavigate()

  const navigateHome = () => {
    navigate('/')
  }
  return (
    <div style={styles.errorContainer}>
      <div style={styles.errorMessage}>페이지를 찾을 수 없습니다.</div>
      <button onClick={navigateHome} style={styles.retryButton}>
        메인 페이지
      </button>
    </div>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
    errorContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        color: '#333',
        backgroundColor: '#f8f9fa',
    },
    errorMessage: {
        marginBottom: '20px',
        fontSize: '24px',
    },
    retryButton: {
        fontSize: '16px',
        padding: '10px 20px',
        backgroundColor: '#ffc107',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        color: 'white',
        fontWeight: 'bold',
        outline: 'none',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.25)',
        transition: 'background-color 0.3s ease',
    },
}
