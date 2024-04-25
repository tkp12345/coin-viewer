import React from 'react'

const SwitchInputWithImg = ({
  img,
  title,
  focused,
  setFocused,
  value,
  onChange,
}: {
  img: string
  title: string
  value: string
  focused: boolean
  setFocused: (focused: boolean) => void
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  isFocus?: boolean
}) => (
  <div
    style={{ ...styles.inputWithIcon, ...(focused ? styles.inputWrapperFocused : null) }}
    onFocus={() => setFocused(true)}
    onBlur={() => setFocused(false)}
  >
    <img src={img} alt="Icon" style={styles.inputIcon} />
    {title}
    <input style={styles.input} type="text" value={value} onChange={onChange} />
  </div>
)

const SwitchButtonWithImg = ({ img, onClick }: { img: string; onClick: () => void }) => (
  <button style={styles.conversionButton} onClick={onClick}>
    <img src={img} alt="Convert" style={styles.conversionImage} />
  </button>
)

export const SwitchInputWrap = {
  Input: SwitchInputWithImg,
  Button: SwitchButtonWithImg,
}

const styles: { [key: string]: React.CSSProperties } = {
  conversionButton: {
    cursor: 'pointer',
    margin: '-0.8rem',
    zIndex: 10,
  },
  conversionImage: {
    height: '2.5rem',
    width: '2.5rem',
  },
  input: {
    flex: 1,
    fontSize: '1.5rem',
    border: 'none',
    outline: 'none',
    padding: '10px',
  },
  inputWrapperFocused: {
    border: '1px solid #10B981',
  },
  inputWithIcon: {
    background: '#fff',
    border: '1px solid #d1d5db',
    borderRadius: '12px',
    padding: '0.5rem 0.8rem',
    transition: 'border-color 0.2s',
    color: '#6b7280',
    fontSize: '0.8rem',
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    width: '100%',
  },
  inputIcon: {
    width: '2.2rem',
    height: '2.2rem',
  },
}
