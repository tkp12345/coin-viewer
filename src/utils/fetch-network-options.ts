interface HttpStatusMessages {
  [statusCode: number]: string
}
const statusMessages: HttpStatusMessages = {
  200: '요청이 성공적으로 처리되었습니다.',
  201: '리소스가 성공적으로 생성되었습니다.',
  400: '잘못된 요청입니다. 입력을 확인해주세요.',
  401: '인증이 필요합니다. 로그인을 확인해주세요.',
  403: '접근이 거부되었습니다. 접근 권한을 확인해주세요.',
  404: '요청한 리소스를 찾을 수 없습니다.',
  429: '요청이 너무 많습니다. 잠시 후에 다시 시도해주세요.',
  500: '서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  502: '게이트웨이 오류입니다. 네트워크 상태를 확인해주세요.',
  503: '서비스를 사용할 수 없습니다. 서버가 일시적으로 과부하 상태이거나 유지보수 중입니다.',
  504: '게이트웨이 타임아웃 오류입니다. 네트워크 연결을 확인해주세요.',
}

function _getResponseMessage(statusCode: number): string {
  return statusMessages[statusCode] || '알 수 없는 오류가 발생했습니다. 관리자에게 문의해주세요.'
}
