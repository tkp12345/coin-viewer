/*
 000 단위 소숫점 제거
 */
export const formatStringToNumber = (str: string) => {
  const num = parseFloat(str)
  // isNaN 체크는 숫자가 아닌 문자열이 들어왔을 경우를 대비한 것입니다.
  if (isNaN(num)) {
    return str // 숫자가 아닌 경우 입력 문자열을 그대로 반환
  }

  if (num % 1 === 0) {
    return num.toString() // 소수부가 없는 경우 정수 부분만 반환
  }

  return num.toFixed(8).replace(/\.?0+$/, '') // 소수점 이하 불필요한 0 제거
}
