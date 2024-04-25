import React from 'react'

export const DefaultSuspenseLoading = () => {
  return (
    <div style={spinnerWrap}>
      <style>{keyframesStyle}</style>
      <div style={spinnerStyle}></div>
    </div>
  )
}

const spinnerWrap: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
}

const spinnerStyle = {
  border: '8px solid #f3f3f3',
  borderTop: '8px solid #3498db',
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  animation: 'spin 2s linear infinite',
}

const keyframesStyle = ` 
    @keyframes spin { 
      0% { transform: rotate(0deg); } 
      100% { transform: rotate(360deg); } 
    }
  `
