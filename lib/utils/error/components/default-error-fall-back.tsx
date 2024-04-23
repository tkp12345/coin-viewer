interface DefaultErrorFallBackProps {
  reset?: () => void
}
export const DefaultErrorFallBack = ({ reset }: DefaultErrorFallBackProps) => {
  return (
    <div>
      <div>알수없는 오류가 발생했습니다.</div>
      <button onClick={reset}>다시 시도</button>
    </div>
  )
}
