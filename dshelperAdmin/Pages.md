# 페이지 문서

## 개요
- 이 문서는 현재 프론트엔드 라우트 기준으로 각 페이지의 목적과 주요 기능을 정리한 문서이다.
- 기준 파일은 [App.jsx](C:\Users\dldbs\Desktop\dshelper-admin-fe\dshelperAdmin\src\App.jsx)와 실제 페이지 컴포넌트이다.

## 1. 관리자 홈
- 경로: `/`
- 파일: [Dshelper.jsx](C:\Users\dldbs\Desktop\dshelper-admin-fe\dshelperAdmin\src\components\Dshelper.jsx)
- 레이아웃: [AdminLayout.jsx](C:\Users\dldbs\Desktop\dshelper-admin-fe\dshelperAdmin\src\layout\AdminLayout.jsx)

### 기능
- 회원가입 이동
- 일반 로그인 이동
- 카카오 로그인 시작
- 네이버 로그인 시작
- 로그아웃 처리
- `accessToken` 수동 입력 후 `localStorage` 저장
- 관리자 기능 페이지로 이동
  - 문의 관리
  - 예약 관리
  - 게시글 작성

## 2. 카카오 로그인 콜백
- 경로: `/oauth/kakao/callback`
- 파일: [KakaoCallbackPage.jsx](C:\Users\dldbs\Desktop\dshelper-admin-fe\dshelperAdmin\src\pages\KakaoCallbackPage.jsx)

### 기능
- URL Query String에서 카카오 인가 코드 `code` 추출
- 백엔드 카카오 로그인 API에 `POST` 요청
- 응답 Body의 `accessToken`, `refreshToken` 파싱
- 토큰을 `localStorage`에 저장
- 성공 시 관리자 홈으로 이동
- 실패 시 오류 메시지 출력

## 3. 문의 관리
- 경로: `/admin/inquiry`
- 파일: [InquiryList.jsx](C:\Users\dldbs\Desktop\dshelper-admin-fe\dshelperAdmin\src\components\admin\InquiryList.jsx)
- 상세 항목: [InquiryItem.jsx](C:\Users\dldbs\Desktop\dshelper-admin-fe\dshelperAdmin\src\components\admin\InquiryItem.jsx)

### 기능
- 답변이 필요한 문의 목록 조회
- 문의 유형, 작성자, 작성일, 본문, 첨부 이미지 확인
- 문의별 답변 입력
- 답변 등록 요청
- 문의 취소 요청
- 처리 완료 후 목록에서 제거

## 4. 예약 관리
- 경로: `/admin/reservations`
- 파일: [PersonalReservationService.jsx](C:\Users\dldbs\Desktop\dshelper-admin-fe\dshelperAdmin\src\services\PersonalReservationService.jsx)

### 기능
- 개인 예약 요청 목록 조회
- 기관 예약 요청 목록 조회
- 예약자, 연락처, 방문일, 시간, 상태, 요청사항 확인
- 개인 예약 상태 변경
  - 완료
  - 취소
- 기관 예약 상태 변경
  - 완료
  - 취소

## 5. 게시글 작성
- 경로: `/admin/create-post`
- 파일: [PostCreatePage.jsx](C:\Users\dldbs\Desktop\dshelper-admin-fe\dshelperAdmin\src\pages\PostCreatePage.jsx)
- 폼: [PostCreateForm.jsx](C:\Users\dldbs\Desktop\dshelper-admin-fe\dshelperAdmin\src\components\posts\PostCreateForm.jsx)

### 기능
- 게시글 제목 입력
- 게시글 내용 입력
- 이미지 파일 첨부
- 게시글 생성 API 요청
- 성공 시 입력값 초기화
- 실패 시 오류 알림 출력

## 공통 인증 처리
- API 클라이언트: [Api.jsx](C:\Users\dldbs\Desktop\dshelper-admin-fe\dshelperAdmin\src\api\Api.jsx)
- 공통 API 래퍼: [BaseApi.jsx](C:\Users\dldbs\Desktop\dshelper-admin-fe\dshelperAdmin\src\api\BaseApi.jsx)
- 토큰 저장소: [tokenStorage.js](C:\Users\dldbs\Desktop\dshelper-admin-fe\dshelperAdmin\src\utils\tokenStorage.js)
- 헤더 적용: [authorizationHeader.js](C:\Users\dldbs\Desktop\dshelper-admin-fe\dshelperAdmin\src\utils\authorizationHeader.js)

### 동작
- `localStorage`의 `accessToken`을 읽어 모든 API 요청의 `Authorization` 헤더에 `Bearer` 접두어와 함께 담아 전송한다.
- 카카오 로그인 응답의 `accessToken`, `refreshToken`을 저장한다.
