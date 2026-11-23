# 02. UI 구현 지침

> 목적: 사용자가 보고 누르는 화면(HTML/CSS/JS)을 어떻게 만들지 정합니다.
> **디자인(색·간격·모양·배치 분위기)은 사용자의 참고 파일이 기준**이고, 이 문서는 **화면에 무엇이 있어야 하는지(구성·상태·이름·문구)**를 정합니다.

---

## 1. 구현 범위

| 포함 | 제외 |
|------|------|
| `public/index.html`, `public/css/fonts.css`, `public/css/style.css` | 서버 호출 로직 (→ 03 문서) |
| 화면의 모든 상태(대기·로딩·성공·오류) 모양 | 음악·영상 재생 화면 |
| 반응형(모바일·PC) | 다크모드, 애니메이션 효과 과다 사용 |
| 접근성 기본 사항 | 아이콘 라이브러리 (필요하면 CSS 또는 문서의 이모지 사용) |

## 2. 제약 조건

1. 프레임워크·CSS 라이브러리 금지 (순수 HTML/CSS)
2. 글꼴은 Pretendard 웹폰트 (3장 코드 그대로)
3. 이미지 파일을 새로 만들거나 외부 이미지 주소를 쓰지 않는다 (참고 파일에 있는 이미지는 사용자가 `docs/reference/`에 함께 넣어 준 것만 사용)
4. 5장의 **ID 이름을 변경하지 않는다** (JavaScript가 이 이름으로 요소를 찾음)
5. 사용자 입력·AI 응답이 들어가는 자리는 `textContent`로만 채운다 (`innerHTML` 금지)

---

## 3. UI 참고 파일 사용 규칙 (가장 중요)

### 3-1. 참고 파일 위치
사용자의 UI 참고 파일(이미지·HTML·PDF 등)은 **`docs/reference/`** 폴더에 둡니다.

### 3-2. 작업 시작 전 확인
1. `docs/reference/` 폴더를 열어 파일이 있는지 확인한다.
2. **파일이 없거나 열 수 없다면 → 여기서 멈추고 사용자에게 파일을 요청한다.** 디자인을 상상해서 만들지 않는다.
3. 파일이 있으면 아래 항목을 참고 파일에서 **읽어서** `public/css/style.css` 맨 위 `:root` 변수로 정리한다. 참고 파일에서 확인되지 않는 값은 임의로 정하지 말고 사용자에게 묻는다.

| 참고 파일에서 가져올 것 | CSS 변수 이름 (고정) |
|-------------------------|----------------------|
| 배경색 | `--color-bg` |
| 카드/박스 배경색 | `--color-surface` |
| 주요 글자색 | `--color-text` |
| 보조 글자색 | `--color-text-sub` |
| 강조색(버튼 등) | `--color-primary` |
| 강조색 위의 글자색 | `--color-on-primary` |
| 테두리색 | `--color-border` |
| 오류 표시 색 | `--color-error` |
| 모서리 둥글기 | `--radius` |
| 화면 최대 너비 | `--max-width` |
| 기본 간격 단위 | `--space` |

### 3-3. 참고 파일과 이 문서가 다를 때
- **배치·모양·색·간격·분위기** → 참고 파일을 따른다.
- **ID 이름, 화면에 들어가는 항목, 상태별 동작, 문구** → 이 문서를 따른다.
- 참고 파일에 이 문서의 필수 항목(예: 오류 메시지 영역)이 없으면, 참고 파일의 스타일을 이어받아 만들고 사용자에게 "참고 파일에 없는 항목을 만들었다"고 보고한다.
- 참고 파일에 이 문서에 없는 요소(예: 로그인 버튼, 메뉴)가 있으면 **만들지 않고** 사용자에게 알린다.

---

## 4. 글꼴 (웹폰트)

### 4-1. `public/css/fonts.css` — 아래 코드를 **그대로** 사용

```css
@font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Thin.woff2') format('woff2');
    font-weight: 100;
    font-display: swap;
}

@font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-ExtraLight.woff2') format('woff2');
    font-weight: 200;
    font-display: swap;
}

@font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Light.woff2') format('woff2');
    font-weight: 300;
    font-display: swap;
}

@font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Regular.woff2') format('woff2');
    font-weight: 400;
    font-display: swap;
}

@font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Medium.woff2') format('woff2');
    font-weight: 500;
    font-display: swap;
}

@font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-SemiBold.woff2') format('woff2');
    font-weight: 600;
    font-display: swap;
}

@font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Bold.woff2') format('woff2');
    font-weight: 700;
    font-display: swap;
}

@font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-ExtraBold.woff2') format('woff2');
    font-weight: 800;
    font-display: swap;
}

@font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Black.woff2') format('woff2');
    font-weight: 900;
    font-display: swap;
}

@font-face {
    font-family: 'PretendardVariable';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/2611030106@font-variable-694/variable-694/PretendardVariable.woff2') format('woff2');
    font-weight: 45 930;
    font-display: swap;
}

/* 가변: font-family: 'PretendardVariable'; font-variation-settings: "wght" 400; */
```

### 4-2. 적용 규칙
- `index.html`의 `<head>`에서 `fonts.css`를 `style.css`보다 **먼저** 불러온다.
- 글꼴 속도 향상을 위해 `<head>`에 아래 한 줄을 추가한다.
  `<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>`
- `style.css`의 `body`에 아래처럼 지정한다. (기본은 `Pretendard`, `PretendardVariable`은 선언만 해 두고 사용자가 요청할 때 사용)
  `font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Malgun Gothic', sans-serif;`
- 글자 굵기는 참고 파일의 모양에 맞추되, 선언된 굵기(100~900) 안에서만 사용한다.

---

## 5. 화면 구성과 ID (이름 고정)

위에서 아래 순서로 배치합니다. 표의 ID를 **그대로** 사용합니다.

| 영역 | HTML 요소 / ID | 내용 | 처음 상태 |
|------|----------------|------|-----------|
| 헤더 | `<header>` | 서비스 이름 `h1`: **무드 플레이리스트**, 설명 `p`: **지금 마음을 적어 보세요. 어울리는 플레이리스트를 찾아 드려요.** | 보임 |
| 입력 폼 | `form#input-form` | 아래 3개를 감싼다 | 보임 |
| └ 입력창 | `textarea#user-text` | `<label for="user-text">`: **지금 어떤 기분인가요?** / placeholder: **예) 오늘 발표를 망친 것 같아서 계속 마음이 무거워요.** / `maxlength="500"`, `rows="5"` | 보임 |
| └ 글자 수 | `p#char-count` | `0 / 500` | 보임 |
| └ 버튼 | `button#submit-btn` (`type="submit"`) | **분석하고 추천받기** | 보임, 활성 |
| 로딩 | `div#loading` | 로딩 표시 + 문구 **마음을 읽고 있어요…** | 숨김 |
| 오류 | `div#error-box` (`role="alert"`) | 안에 `p#error-message` | 숨김 |
| 안전 안내 | `div#support-notice` | 6장의 고정 문구 | 숨김 |
| 결과 | `section#result` | 아래 항목을 감싼다 | 숨김 |
| └ 분석 결과 제목 | `h2` | **분석 결과** | |
| └ 대표 감정 | `p#result-emotion` | 예: `불안` | |
| └ 감정 강도 | `p#result-intensity` | 예: `강도 3 / 5` | |
| └ 한 줄 요약 | `p#result-summary` | AI의 요약 문장 | |
| └ 분석 이유 제목 | `h2` | **분석 이유** | |
| └ 분석 이유 | `p#result-reason` | AI의 이유 문장 | |
| └ 추천 제목 | `h2` | **이런 플레이리스트는 어때요?** | |
| └ 추천 목록 | `ul#playlist-list` | 항목 3개 (아래 5-1) | |
| 푸터 | `<footer>` | **이 분석은 의료적 진단이 아니며, 재미와 참고용으로 제공됩니다.** | 항상 보임 |

### 5-1. 추천 항목 1개의 구조 (`ul#playlist-list` 안의 `li`, JS가 생성)

```
li.playlist-item
├─ h3.playlist-title      ← 플레이리스트 제목
├─ p.playlist-desc        ← 추천 이유 한 문장
└─ a.playlist-link        ← 버튼처럼 보이는 링크, 문구: "유튜브에서 보기"
                            (target="_blank", rel="noopener noreferrer")
```

### 5-2. 숨김 처리 방법
- 숨김/보임은 HTML의 `hidden` 속성으로 처리한다. (`element.hidden = true / false`)
- CSS에 `[hidden] { display: none !important; }`를 반드시 넣는다. (다른 스타일이 `hidden`을 무시하는 것을 막기 위함)

---

## 6. 화면 상태별 동작 (4가지 상태)

| 상태 | `#loading` | `#error-box` | `#support-notice` | `#result` | `#submit-btn` | `#user-text` |
|------|-----------|--------------|-------------------|-----------|---------------|--------------|
| **대기** (처음) | 숨김 | 숨김 | 숨김 | 숨김 | 활성 | 입력 가능 |
| **로딩** | 보임 | 숨김 | 숨김 | 숨김 | **비활성** (문구 그대로) | 입력 불가(`readonly`) |
| **성공** | 숨김 | 숨김 | `needs_support_notice`가 true일 때만 보임 | 보임 | 활성 | 입력 가능 (내용 유지) |
| **오류** | 숨김 | 보임 (문구 표시) | 숨김 | 숨김 | 활성 | 입력 가능 (내용 유지) |

- 상태가 바뀔 때는 **이전 상태의 흔적(이전 결과·이전 오류)이 남지 않게** 모두 정리한 뒤 새 상태를 표시한다.
- 성공 시 결과 영역(`#result`)이 보이도록 화면을 부드럽게 이동(`scrollIntoView`)한다. 오류 시에는 오류 박스로 이동한다.

### 안전 안내 고정 문구 (`#support-notice`)

> 지금 마음이 많이 힘드시다면 혼자 견디지 않으셔도 괜찮아요. 가까운 사람이나 전문 상담 기관에 이야기해 보세요. 자살예방 상담전화 **109**는 24시간 이용할 수 있어요.

- 위 문구를 **한 글자도 바꾸지 않고** 사용한다.
- 이 박스는 오류 박스(`#error-box`)와 구분되는 부드러운 스타일을 사용한다. (경고 느낌의 빨간색 금지, 참고 파일의 보조 색 사용)

---

## 7. 반응형 규칙

| 화면 너비 | 규칙 |
|-----------|------|
| 360px ~ 767px (모바일) | 한 열, 좌우 여백 확보, 버튼은 가로 전체 너비 |
| 768px 이상 (PC·태블릿) | 콘텐츠를 `--max-width` 안에 가운데 정렬 |
| 공통 | 가로 스크롤이 생기면 안 됨. 긴 단어·문장은 줄바꿈 (`overflow-wrap: anywhere`) |

- 글자 크기는 모바일 본문 **16px 이상** (iOS에서 입력창 확대 방지)
- 단위는 참고 파일에서 확인되는 값을 기준으로 하되, 확인되지 않으면 사용자에게 묻는다.

---

## 8. 접근성 기본 사항

1. 입력창에는 반드시 `<label>`을 연결한다.
2. 오류 박스는 `role="alert"`, 결과 영역은 `aria-live="polite"`를 지정한다.
3. 버튼·링크에 키보드 포커스가 갔을 때 눈에 보이는 표시(outline)를 유지한다. (`outline: none`만 쓰고 끝내지 않는다)
4. 글자색과 배경색의 대비는 읽기에 충분해야 한다. (참고 파일의 색을 쓰되, 읽기 어려우면 사용자에게 알린다)
5. 로딩 표시에는 화면 낭독기용 문구가 있어야 한다. (`#loading` 안의 텍스트가 그 역할)

---

## 9. 이 단계의 작업 방법 (서버 없이 먼저 만든다)

1. 3장 규칙대로 참고 파일을 확인한다.
2. `index.html` → `fonts.css` → `style.css` 순서로 만든다.
3. 서버 연결 전에, 화면 상태 4가지를 눈으로 확인할 수 있도록 **임시 확인용 방법**을 쓴다.
   - 예: 개발자도구(F12) 콘솔에서 `document.getElementById('result').hidden = false` 처럼 `hidden`을 직접 바꿔 보기
   - **임시 코드는 파일에 남기지 않는다.**
4. 추천 항목(`li.playlist-item`)은 이 단계에서 확인용 HTML로 한 번 만들어 모양을 확인한 뒤 **삭제**한다. (실제 항목은 JS가 생성)

---

## 10. 완료 기준

- [ ] 5장의 모든 ID가 `index.html`에 존재하고, 처음 상태가 표와 같다
- [ ] 6장의 4가지 상태를 (임시 방법으로) 모두 화면에서 확인했다
- [ ] Pretendard가 적용된다 (개발자도구 → 요소 선택 → Computed → font-family 확인)
- [ ] 360px, 768px, 1280px 너비에서 가로 스크롤·겹침이 없다
- [ ] 색·모양·배치가 참고 파일과 같은 느낌이다 (사용자 확인)
- [ ] `innerHTML`, 외부 라이브러리, 문서에 없는 요소가 없다

## 11. 검증 기준

| 확인 | 방법 | 합격 |
|------|------|------|
| ID 존재 | 개발자도구 콘솔에서 `document.getElementById('아이디')` 실행 | 5장의 모든 ID가 `null`이 아님 |
| 상태 전환 | 9장 방법으로 `hidden` 바꿔 보기 | 6장 표와 일치 |
| 글꼴 | 개발자도구 Network 탭에서 `woff2` 파일 로딩 확인 | Pretendard 파일이 불러와짐 |
| 반응형 | 개발자도구 기기 모드로 360 / 768 / 1280px | 깨짐 없음 |
| 참고 파일 일치 | 사용자에게 나란히 비교해 보여 주기 | 사용자가 승인 |
