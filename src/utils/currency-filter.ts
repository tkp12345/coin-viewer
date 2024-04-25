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
  // 콤마를 제거
  const numbers = input.replace(/,/g, '')
  // 입력값이 소수점만 포함하는지 확인
  if (/^\d+\.\d+$/.test(numbers)) {
    // 순수 소수점 수는 그대로 반환
    return numbers
  } else {
    // 그 외의 경우 천 단위로 콤마를 추가하여 포맷팅
    return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
}

/*
 소수점 뒤에 오는 0 제거
 */
export const _formatDecimal = (input: string) => {
  // 콤마 제거
  const cleanedInput = input.replace(/,/g, '')

  // 소수점 뒤의 불필요한 0을 제거하고, 필요없으면 소수점도 제거
  const result = cleanedInput.replace(/(\.\d*?)0+$/, '$1').replace(/\.$/, '')

  // 천 단위로 콤마를 추가하여 포맷팅 (소수점이 남아있는 경우 포함)
  return result.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
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
