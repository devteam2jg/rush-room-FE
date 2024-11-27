# Rush Room

## 소개

Rush Room은 **라이브 스트리밍과 실시간 채팅을 결합한 혁신적인 온라인 경매 플랫폼**입니다. 기존 경매 플랫폼의 한계였던 판매자-구매자 간 소통 문제를 해결하여, 누구나 쉽고 재미있게 경매에 참여할 수 있습니다.

## 주요 기능 ✨

- 📱 **실시간 라이브 스트리밍**

  - 판매자가 실시간 스트리밍으로 직접 상품을 소개하고 홍보
  - 참가자들과 실시간 채팅으로 양방향 소통

- 🎯 **다이나믹 경매 시스템**

  - 입찰가에 따라 동적으로 변하는 경매 시간 시스템
  - 경매 초보자도 쉽게 이용할 수 있는 직관적인 인터페이스

### 관련 링크

[👉 RushRoom 홈페이지](https://rushroom.kr/api/v1/auth-test/login)  
[👉 RushRoom 시연 및 최종 발표 영상](https://www.youtube.com/watch?v=jqIyTOLKfDA)

### 서비스 사진

#### 서비스 메인 화면

![image](https://github.com/user-attachments/assets/254413df-a1cd-4a04-9b08-3e3690feca63)

#### 경매 생성 페이지

![경매생성페이지](https://github.com/user-attachments/assets/87b3cbef-ed82-4e95-9a88-b6bb1ab9cc3a)

#### 경매 리스트 페이지

![경매리스트](https://github.com/user-attachments/assets/10ac384f-ec83-47a9-b92d-6c4c528e2bff)

#### 경매 상세 페이지

![경매상세페이지](https://github.com/user-attachments/assets/355400a7-8f83-4ab2-a396-c9df6701eafb)

#### 경매 상세 정보

![경매상세정보](https://github.com/user-attachments/assets/1c178055-3464-486e-8c02-6272ae8bdc3c)

#### 경매 물품 생성 페이지

![경매물품생성페이지](https://github.com/user-attachments/assets/50cbac46-f9f2-4a08-a747-21c5a35235ee)

#### 경매 물품 상세 페이지

![경매물품상세](https://github.com/user-attachments/assets/57097511-4611-4faf-852b-a780a3777594)

#### 마이페이지

![마이페이지](https://github.com/user-attachments/assets/50f38067-8cdc-4bd8-842b-ba320a033834)

#### 경매 입장 화면(판매자)

![경매입장화면(판매자)](https://github.com/user-attachments/assets/64c25cc3-23d1-43bb-9089-04689b1aea3c)

#### 경매 진행 페이지

![경매진행](https://github.com/user-attachments/assets/25c0bf75-4eb5-46f8-a666-c140837b5cc3)

#### 경매 입찰 페이지

![경매입찰](https://github.com/user-attachments/assets/aa6f0e0e-d80b-4c71-81af-73bd2fa058a9)

#### 경매 RushTime

![경매RushTime](https://github.com/user-attachments/assets/207f13f6-0a9b-4470-8a6e-693e30302a6f)

#### 경매 15초 CountDown

![경매CountDown](https://github.com/user-attachments/assets/9677be88-54a1-4986-b697-48f19d9841d0)

#### 경매 결과 화면

![경매결과](https://github.com/user-attachments/assets/4ea45817-cf45-4956-81c1-323095810e10)

#### 경매 대기 화면(Blinking)

![경매대기](https://github.com/user-attachments/assets/00f70f4f-8e55-49db-bb2b-be6af53ba186)

#### 경매 최종 결과(Swipe)

![경매최종결과](https://github.com/user-attachments/assets/dbb20409-81c8-4f21-ad28-1bc48b85eb85)

### 프로젝트 포스터

![image](https://github.com/user-attachments/assets/d705b9e8-f11b-4781-82c5-5a5f891fff5a)

## Troubleshooting 🔍

- ### React 에서 마우스 드래그 - 모바일 터치 다루기

  - 문제 상황  
    경매 아이템 목록 순서 수정 시 HTML draggable 속성을 활용해 드래그 앤 드롭을 구현함
    모바일 환경에서는 draggable 속성이 지원되지 않음을 발견

  - 해결 과정
    모바일에서 작동하기 위해 Mouse Event 대신 Touch Event 를 처리

    1. 터치가 시작될 때 (touchstart)
    2. 터치 중(touchmove)
    3. 터치가 끝날 때(touched) 이벤트를 감지해 동작하도록 로직을 분리

  - 결론

    React-beauriful-dnd 를 도입

    - 직접 마우스와 터치이벤트를 다루는 코드를 작성하다보니 로직이 *불필요하게 복잡*해짐
    - 마우스와 터치 이벤트를 모두 지원하는 검증된 라이브러리인 React-beauriful-dnd 를 도입

- ### Chakra UI 의 구조적인 문제점

  - 문제 상황  
    기존의 컴포넌트에 Chakra UI로 구현해 놓았던 Modal, Drawer 가 웹뷰로 전환되면서 예상치 못한 위치에서 생성되는 이슈 발생
    DOM 루트의 Portal을 기준으로 부모의 스타일이나 레이아웃을 무시하는 것이 원인

  - 해결 과정
    Tailwind CSS를 이용하여 커스텀 Drawer과 Modal 구현

  - 결론

    Chakra UI 와 같은 라이브러리를 사용할 때, 기본 동작과 원리를 충분히 이해하고 신중하게 도입해야겠다고 생각함

- ### React Query 캐싱 전략

  - 문제 상황

    경매 아이템 목록을 가져올 때 캐시된 데이터와 실제 DB 데이터 간의 불일치 가능성  
    캐시된 데이터를 사용하는 동안 새로운 아이템이 추가될 수 있는 상황

  - 해결 과정

    캐시 사용의 목적 검토

    1. 불필요한 API 요청 최소화
    2. 사용자 경험 개선
    3. 자동 백그라운드 리프레시로 최신 데이터 유지

  - 결론

    캐시 적용 기준

    ✅ 정적인 데이터 (사용자의 정보 등)  
    ✅ 인증 확인 로직의 경우 시간을 짧게 가져가고 리포커스시 재확인  
    ❌ 경매 아이템, 경매 목록 등의 변동성이 높은 가벼운 데이터  
    ❌ 실시간성이 중요한 데이터

- ### 모바일 브라우저의 100vh 이슈

  - 문제 상황

    - 모바일 브라우저에서 `height: 100vh` 사용 시, 주소창과 하단 네비게이션 바가 차지하는 영역까지 포함되어 계산됨
    - 콘텐츠를 가리거나 의도치 않은 스크롤이 발생

  - 해결 과정

    JS로 실제 viewport 높이를 가져올 수 있다는 점에 착안

    1. 처음 App.tsx가 로드 될 때 window.InnerHeight _ 0.01 을 --vh 로 저장하여 calc(--vh, 1vh) _ 100 으로 사용
    2. --vh 가 존재하지 않을 경우 1vh를 fallback으로 사용

    처음 로드 이후 창 크기 변경 시 초기 크기로 고정이 되어버림

    1. resize 이벤트 리스너를 등록하고, debounce를 통해서 250ms 불필요한 연산을 방지

  - 결론

    ✅ 다양한 디바이스에서 정확한 높이 적용

- ### 한글 입력을 Enter로 제출 시 중복 제출 이슈

  - 문제 상황

    - 영어는 문제가 없었으나 한글 입력시 enter로 제출하면 중복 제출이 되는 문제 발생

  - 해결 과정

    - 한글은 IME를 통해 composition이 필요한 것이 원인
    - compositionend 이벤트와 브라우저의 keydown 이벤트의 중복
    - W3C 표준에서 권장하는 isComposing 플래그를 사용하여 composing 중의 이벤트와 브라우저 이벤트를 구분하여 사용

  - 결론  
     ✅ 의도한 입력 이벤트만 발생

## 기술적 챌린지 🔧

### 실시간 경매 채팅 시스템 최적화

- 문제 상황

  - 채팅 내역 누적에 따른 메모리 부하 증가
  - 페이지 새로고침 및 소켓 재연결 등의 성능 이슈 발생
  - 대량의 채팅 렌더링 시간 지연으로 인한 사용자 경험 저하

- 해결 방안

  1. 채팅 데이터 수명주기 관리

  - 경매 특성을 고려한 채팅 데이터 보존 정책 수립
  - 과거 채팅 데이터 자동 정리 시스템 구현
  - 입찰 관련 중요 채팅 정보 서버 저장 로직 구현

  2. React 컴포넌트 최적화

  - memo를 활용한 불필요한 리렌더링 방지
  - useCallback 훅을 통한 함수 재선언 최적화
  - 안정적인 key 값 설계로 불필요한 인스턴스 생성 방지

- 개선 성과 📊

  ![image](https://github.com/user-attachments/assets/9e0e938a-9e7a-4658-a530-6cb56bf32ae6)

- 최종 효과

  - 실시간 경매 채팅의 반응 속도를 40ms 미만으로 유지
  - 전반적인 서비스 안정성 향상으로 사용자 경험 개선
  - 시스템 리소스 사용 효율성 대폭 개선

## 핵심 기술 🔧

- ### Socket 관리 최적화

  Custom Hook을 통한 Socket 인스턴스의 유일성 보장
  전역 상태 관리를 통한 중복 생성 방지 및 효율적인 Socket 관리

- ### 실시간 인증 관리 구현

  React Query의 캐시 시스템과 Background Refetching 활용
  주기적인 토큰 유효성 검증 및 만료 시 자동 로그인 페이지 리다이렉션
  브라우저 포커스 시점의 자동 검증 로직 구현

- ### 성능 최적화

  컴포넌트 단위의 Socket 이벤트 리스너 관리

  필요한 시점에만 이벤트 리스너 등록
  Cleanup 함수를 통한 확실한 리소스 해제

  Props drilling 최소화를 통한 리렌더링 최적화
  빈번한 업데이트가 발생하는 컴포넌트 분리

  시간, 입찰 금액, 입찰자 정보 등 고빈도 업데이트 요소 모듈화

- ### 오디오 시스템 최적화

  AudioAnalyzer를 활용한 음성 감지 시스템

  임계값(Threshold) 기반 사용자 음성 인식
  실시간 효과음 볼륨 자동 조절

  브라우저 정책에 맞추어 사용자의 화면 상호작용 유도

## 기술적 의사 결정 👥

### UI Component Library 선택

- #### 도입 배경

  - 재사용성이 높은 컴포넌트 구현 필요
  - 일관된 디자인 시스템 구축
  - 개발 생산성 향상
  - 프로젝트 시간 제약

- #### 후보군 분석

  #### Material-UI

  - 장점
    - 검증된 기술스택
    - Material Design 기반의 방대한 컴포넌트
    - 모바일 최적화된 UI 제공
  - 단점
    - 무거운 컴포넌트 구조
    - Material Design 가이드라인 준수로 인한 오버헤드
    - 다양한 정보 처리/표현에 부적합

  #### Chakra-UI

  - 장점
    - 직관적인 props 기반 스타일링
    - 낮은 러닝 커브
    - 간단한 반응형 구현
    - 전역 다크모드 지원
    - 유연한 스타일 수정
  - 단점
    - CSS-in-JS 기반의 런타임 성능 이슈
    - 복잡한 스타일/잦은 렌더링 시 성능 오버헤드

- #### 성능 최적화 고려사항

  #### 캐싱 및 메모이제이션 효율

  - **Material-UI**
    - 복잡한 스타일 구조로 인한 캐싱 효율 저하
    - 동적 스타일 변경 시 새로운 객체 생성 가능성
  - **Chakra-UI**
    - props 기반 스타일링으로 효율적 캐싱
    - 동일 props에 대한 스타일 객체 재사용성 우수

- #### 최종 결정

  Chakra-UI를 주요 컴포넌트 라이브러리로 채택하되, 성능 크리티컬한 부분(채팅 등)은 Tailwind CSS 활용

- #### 결정 근거

  1. 서비스 특성상 동적 스타일링이 많은 상황
  2. Portal 요소의 모바일 웹뷰 호환성 문제 해결을 위해 Tailwind CSS 병행
  3. 채팅과 같은 고빈도 렌더링 컴포넌트의 성능 최적화

### 경매 시스템 아키텍처 변경

- #### 초기 설계

  - 프론트엔드 주도의 경매 생명주기 관리
  - 클라이언트에서 시간, 상태 관리

  #### 문제점

  - 복잡도 증가
  - 과도한 상태 의존성
  - 동기화 이슈 발생

- #### 개선된 설계

  - 서버 주도의 생명주기 관리
  - 1초 간격의 서버 시간 동기화
  - 상태 관리 단순화

- #### 이점

  - 신뢰할 수 있는 단일 시간 소스
  - 상태 동기화 보장
  - 클라이언트 로직 단순화

### 상태 관리 아키텍처

- #### 도입 배경

  - 전역 상태 관리의 필요성
  - 서버 상태와 클라이언트 상태의 명확한 분리 요구
  - 실시간 데이터 동기화 필요성

- #### 상태 관리 라이브러리 선택

  #### Redux vs Zustand 비교

  ##### Redux

  - 장점
    - 예측 가능한 상태 흐름
    - 강력한 개발자 도구
    - 큰 커뮤니티
  - 단점
    - 과도한 보일러플레이트
    - 높은 러닝커브
    - 번거로운 비동기 처리
    - 번들 사이즈 증가

  ##### Zustand

  - 장점
    - 최소한의 보일러플레이트
    - 직관적인 API
    - 작은 번들 사이즈 (~1KB)
    - TypeScript 지원 우수
    - 미들웨어 지원
  - 단점
    - 상대적으로 작은 커뮤니티
    - 대규모 상태 관리시 추가 설계 필요

### 데이터 계층 분리

- #### 클라이언트 상태 (Zustand)

  - 이점
    - 간단한 상태 업데이트
    - 최소한의 코드로 구현
    - 높은 성능

- #### 서버 상태 (React Query)

  - 이점
    - 자동 캐시 관리
    - 백그라운드 데이터 동기화
    - 낙관적 업데이트
    - 무한 스크롤/페이지네이션 지원

- #### 구현 전략

  - 상태 설계 원칙

    1. 최소한의 전역 상태 유지
    2. props drilling 방지
    3. 실시간 데이터는 React Query로 관리

  - 성능 최적화

    1. 선택적 구독으로 리렌더링 최소화
    2. React Query 캐시 전략 최적화

- #### 결과

  - 코드베이스 복잡도 감소
  - 유지보수성 향상
  - 개발 생산성 증가
  - 성능 개선

## 기술 스택 🛠

### Frontend Tech Stack

<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white"><p>

<img src="https://img.shields.io/badge/tanstack query-000000?style=for-the-badge&logo=reactquery&logoColor=white"><p>

<img src="https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=Socket.io&logoColor=white"><p>

<img src="https://img.shields.io/badge/WebRTC-333333?style=for-the-badge&logo=WebRTC&logoColor=white"><p>

<img src="https://img.shields.io/badge/zustand-FFD700?style=for-the-badge&logo=zustand&logoColor=white"><p>

<img src="https://img.shields.io/badge/Chakra UI-319795?style=for-the-badge&logo=Chakra UI&logoColor=white"><p>

<img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=for-the-badge&logo=Tailwind CSS&logoColor=white"><p>

### Team Collaboration Tool

<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"><p>

<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"><p>

<img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white"><p>

<img src="https://img.shields.io/badge/slack-4A154B?style=for-the-badge&logo=slack&logoColor=white"><p>

<img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white"><p>

## 구성원 역할 💪

### 정재욱

- 컴포넌트 구조 설계

- 라우터 구조 설계

- 상태관리 전략 수립

- 로그인 및 검증 로직 구현

- 홈페이지 무한 스크롤 구현

- 경매 및 아이템 생성 페이지

- 경매 아이템 상세 페이지(이미지, hls 영상)

- 서비스 전반 반응형 구현

- Modal, Drawer 구현

- 경매 실시간 채팅방 구현

- 경매 흐름 로직, 효과음, 이펙트 구현

- 사용자 음성 인식 효과음 음량 조절 로직 구현

- 경매방 별 QR 로직 구현

### 정소연

- 피그마 디자인

- UI 디자인 구현

- 경매 및 경매 물품 수정 로직 구현

- 홈 페이지 구현

- 경매 상세 정보 컴포넌트 구현

- 경매 리스트 페이지 구현

- 마이페이지 구현

- 네비게이션 바 구현

- 경매 타이머, 사운드 이펙트

- webRTC 라이브 영상 구현

## 프로젝트 후기 🧠

### 정소연

- 기술적으로는 중복되는 로직을 훅으로 분리하여 필요한 곳에서 재사용하는 방법을 배웠다. 이를 통해서 컴포넌트 재사용성과 코드 효율성을 고려한 프로그래밍에 대해 고민하였고, 컴포넌트를 잘 분리하여 관리하는 것이 유지보수와 확장성을 염두했을 때 얼마나 중요한지 알게 되었다.

  Charkra UI 를 도입하여 통일성 있는 디자인과 Atomic한 시스템을 얻을 수 있었지만, 원하지 않는 위치에서 Modal이 생성되는 등 부작용을 경험하였다.

  이를 통해 특정 라이브러리가 가진 장점뿐만 아니라 그로 인한 사이드 이펙트를 신중히 검토하고 필요성을 제고해야한다는 것을 깨달았다. 앞으론 라이브러리를 사용할 때에 득과 실을 잘 따져서 현재 상황에 적합한 선택을 할 수 있게 되었다.

### 정재욱

- 뚜렷한 목표를 가진 팀원들과 함께 각자가 따로 자기 할 일만 하는 게 아닌 하나의 방향성을 가지고 유기적으로 이루어 나간 팀 프로젝트였다.  
  회의를 할 때엔 각자의 의도를 투명하게 두괄식으로 전달하는 법, 팀이라는 공동체 의식을 잊지 않는 것을 크게 배웠고 유능한 사람들이 많이 모였기 때문에 그 어떤 팀 프로젝트보다 의견 충돌이 많았지만 갈등이 가장 적었던 팀이기도 했다.  
  팀에서 구성원으로서 또는 맡은 부분의 리더로서 가져야 할 마음가짐에 대해 많이 고민하고 배운 시간이였다.

  개인적으로는 수치로 말 할 수있는 개발자가 되는 첫 발걸음이기도 했다.  
  모든 선택에 대해 pros & cons가 있다는 것을 항상 인식하고 선택에 대해 근거를 가지려 노력했고, 사용자를 중요시 한다는 말에 대해서 고민하고 실제로 적용하려고 기획단계에서 부터 시도를 한 프로젝트이기도 했다.  
  내가 만든 로직의 사이드이펙트에 대해 인지하고 부정적일 경우 리팩토링하며 짧은 기간 너무 소중한 경험을 많이 했다.

  팀 회고시에는 항상 중요하게 생각했던 책임감, 집요함에 대해 객관적으로 인정을 받았다는 점에서 나름 노력하고 고생했던 시간에 대해 큰 보상을 받기도 했다.

  이런 경험을 안겨준 팀원들에게 감사하고, 부족했던 부분에 대해서는 보완하고 장점은 보강해나가도록 해야겠다는 다짐으로 후기를 마무리한다.
