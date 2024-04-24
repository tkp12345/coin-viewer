export const currencyFilter = (currency: 'krw' | 'usd' | string) => {
  switch (currency) {
    case 'krw':
      return '￦'
    case 'usd':
      return '$'
  }
}
