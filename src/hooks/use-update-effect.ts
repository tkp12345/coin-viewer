import type { DependencyList, EffectCallback } from 'react'
import { useEffect, useRef } from 'react'

export function useUpdateEffect(callback: EffectCallback, dependencies: DependencyList): void {
  const isMounted = useRef(false)

  useEffect(() => {
    if (isMounted.current) {
      // isMounted가 true일 때만 콜백 실행
      return callback()
    }
    // 첫 마운트 시 isMounted를 true로 설정하고 콜백은 실행하지 않음
    isMounted.current = true
    return () => {}
  }, dependencies)

  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])
}
