import { _toast } from '../../../../src/utils/toastify-options'

export const DefaultQueryErrorHandler = (error: any) => {
  const errorMsg = error?.message ? error.message : '네트워크 오류 발생'
  return _toast.error(errorMsg)
}
