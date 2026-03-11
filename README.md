# 강의 수강 신청 플랫폼

온라인 강의를 조회하고 수강 신청하거나 개설할 수 있는 웹 애플리케이션입니다.  
수강생(`STUDENT`)과 강사(`INSTRUCTOR`) 두 가지 역할을 지원합니다.

---

## 기술 스택

| 분류 | 기술 |
|---|---|
| 프레임워크 | Next.js 15 (App Router) |
| 런타임 | React 19 |
| 언어 | TypeScript 5 |
| 스타일링 | Tailwind CSS 4 |
| UI 컴포넌트 | shadcn/ui (Radix UI 기반) |
| 서버 상태 | TanStack React Query 5 |
| 클라이언트 상태 | Zustand 5 |
| 폼 관리 | React Hook Form 7 + Zod 4 |
| 패키지 매니저 | pnpm |

---

## 주요 기능

- **회원가입 / 로그인** — 이메일·비밀번호 기반 인증, accessToken을 httpOnly 쿠키에 저장
- **강의 목록 조회** — 무한 스크롤, 최신순·인기순·별점순 정렬 필터
- **수강 신청** — 강의 카드 선택 후 장바구니 방식으로 일괄 신청
- **강의 개설** — 강사 역할 사용자만 강의 개설 모달 접근 가능
- **인증 가드** — 미들웨어로 비로그인 사용자의 보호된 경로 접근 차단

---

## 페이지 구조

| 경로 | 설명 |
|---|---|
| `/` | 홈 — 로그인 상태에 따라 로그아웃 버튼 또는 로그인 링크 표시 |
| `/login` | 로그인 |
| `/signup` | 회원가입 (역할 선택 포함) |
| `/class` | 강의 목록 조회 및 수강 신청 |

---

## 프로젝트 구조

```
application-for-classes/
├── proxy.ts                      # Next.js 미들웨어 (인증 가드)
├── components/ui/                # shadcn/ui 공통 컴포넌트
├── hooks/                        # 공통 훅
├── lib/                          # 공통 유틸
└── app/
    ├── _block/                   # 앱 전역 공유 블록
    │   ├── actions/api/          # Server Actions (로그인·회원가입·강의 CRUD)
    │   ├── providers/            # ReactQueryProvider
    │   ├── store/                # Zustand 스토어 (장바구니 상태)
    │   └── utils/                # React Query 클라이언트, localStorage 유틸
    ├── login/
    ├── signup/
    └── class/
        └── _block/
            ├── actions/api/      # 강의 페이지 전용 Server Actions
            ├── hooks/            # 무한 스크롤 훅
            └── components/      # 강의 카드, 필터, 수강 신청 모달 등
```

> `_block` 폴더는 Next.js App Router의 라우팅에서 제외되는 `_` 접두사를 활용해,  
> 각 라우트 세그먼트의 관련 파일을 도메인별로 모아두는 컨벤션입니다.

---

## 아키텍처 특징

- **Server Actions** — 모든 API 호출은 `"use server"`로 구현되어 API 주소와 토큰이 클라이언트에 노출되지 않습니다.
- **SSR + Hydration** — `/class` 페이지는 서버에서 React Query로 초기 데이터를 prefetch 후 `HydrationBoundary`로 클라이언트에 전달합니다.
- **무한 스크롤** — `IntersectionObserver` 기반의 `useInfiniteScrollTrigger` 훅으로 강의 목록을 로드합니다.
- **장바구니 패턴** — Zustand 스토어로 강의 선택 상태를 관리하고 일괄 수강 신청(`/enrollments/batch`)을 처리합니다.
- **역할 기반 UI** — localStorage에 저장된 유저 역할(`STUDENT` / `INSTRUCTOR`)에 따라 강의 개설 버튼 노출 여부를 제어합니다.

---

## 시작하기

### 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성합니다.

```
API_BASE_URL=http://localhost:8080/api
```

### 설치 및 실행

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 프로덕션 빌드
pnpm build

# 프로덕션 서버 실행
pnpm start
```

개발 서버는 기본적으로 [http://localhost:3000](http://localhost:3000)에서 실행됩니다.  
백엔드 API 서버(기본값: `http://localhost:8080`)가 별도로 실행 중이어야 합니다.
