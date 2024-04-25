export const _currencyFilter = (currency: 'krw' | 'usd' | string) => {
  switch (currency) {
    case 'krw':
      return '￦'
    case 'usd':
      return '$'
  }
}

//소숫점 8재자리 까지 유효성 - Cryptocurrency 조건
export const _isValidCryptoRegex = (value: string) => /^\d*\.?\d{0,8}$/.test(value)

//정수만 가능 - Currency 조건
export const _isValidCurrencyRegex = (value: string) => /^[1-9]\d*$/.test(value)

export const _formatNumberWithDots = (input: string) => {
  // 숫자가 아닌 모든 문자를 제거
  const numbers = input.replace(/[^\d]/g, '')
  // 천 단위로 점을 추가하여 포맷팅
  return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const _currencyConvertor = ({
  currency,
  marketData,
}: {
  currency: string
  marketData: {
    current_price: {
      krw: number
      usd: number
    }
  }
}) => {
  switch (currency) {
    case 'krw':
      return marketData.current_price.krw
    case 'usd':
      return marketData.current_price.usd
    default:
      return marketData.current_price.krw
  }
}
