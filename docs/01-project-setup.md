# 01. 프로젝트 생성 지침

> 목적: 빈 폴더에서 시작해 "코드를 쓸 준비가 된 프로젝트"를 만들고, 마지막에 Vercel에 배포하는 방법을 정합니다.
> 이 문서의 파일 내용은 **그대로** 만듭니다. 임의로 바꾸지 않습니다.

---

## 1. 구현 범위

| 포함 | 제외 |
|------|------|
| 폴더·설정 파일 생성 | 화면 코드 (→ 02 문서) |
| `openai` 패키지 설치 | 서버 로직 (→ 03 문서) |
| 환경변수 준비 | |
| 로컬 실행 방법 | |
| Vercel 배포 | |

## 2. 제약 조건

- 설치해도 되는 패키지는 `openai` 하나뿐 (Vercel CLI는 개발 도구이므로 예외, 3장 참고)
- Node.js는 사용자 컴퓨터에 설치된 **LTS 버전**을 사용 (에이전트가 버전을 정하지 않음. `node -v` 결과를 보고서에 적기)
- 폴더 구조는 `agents.md` 5장과 같아야 함

---

## 3. 사전 준비물 (사용자가 준비)

| 준비물 | 확인 방법 | 없을 때 |
|--------|-----------|---------|
| Node.js (LTS) | 터미널에서 `node -v` | 사용자에게 설치 요청 |
| OpenAI API 키 | OpenAI 플랫폼에서 발급 | 사용자에게 요청 (에이전트가 대신 발급할 수 없음) |
| 사용할 OpenAI 모델 이름 | 사용자가 결정 | 사용자에게 물어봄. **에이전트가 임의로 정하지 않음** |
| Vercel 계정 | vercel.com | 사용자에게 가입 요청 |
| Vercel CLI | `vercel --version` | `npm install -g vercel` 실행 (사용자 허락 후) |

> 위 준비물이 없으면 해당 단계에서 멈추고 사용자에게 요청합니다.

---

## 4. 생성 절차

### 4-1. 폴더 만들기

`agents.md` 5장의 폴더 구조대로 폴더와 빈 파일을 만듭니다. (`agents.md`, `PRD.md`, `docs/`는 이미 있음)

### 4-2. package.json 만들기

터미널에서 아래 순서로 실행합니다.

```bash
npm init -y
npm pkg set name="mood-playlist"
npm pkg set private=true
npm pkg set type="module"
npm pkg set scripts.dev="vercel dev"
npm install openai
```

- `type="module"`: `import ... from ...` 문법을 쓰기 위한 설정
- `npm install openai`: 버전은 npm이 정해 주는 대로 둡니다 (버전을 직접 적지 않음)
- 결과물인 `package.json`에 `dependencies`는 `openai` **하나만** 있어야 합니다.

### 4-3. vercel.json 만들기

```json
{
  "framework": null,
  "outputDirectory": "public",
  "functions": {
    "api/analyze.js": {
      "maxDuration": 30
    }
  }
}
```

- `outputDirectory: "public"`: `public` 폴더 안의 파일이 웹사이트 화면이 됩니다.
- `maxDuration: 30`: 서버 함수가 최대 30초까지 기다리도록 설정합니다.

### 4-4. .gitignore 만들기

```
node_modules/
.env
.env.local
.vercel/
.DS_Store
```

### 4-5. .env.example 만들기 (양식 파일, 실제 키 금지)

```
# 이 파일을 복사해서 .env.local 로 이름을 바꾼 뒤 값을 채우세요.
OPENAI_API_KEY=여기에_OpenAI_API_키
OPENAI_MODEL=여기에_사용할_모델_이름
```

### 4-6. .env.local 만들기 (사용자가 직접)

- `.env.example`을 복사해 `.env.local`을 만들고 **사용자가 직접** 실제 값을 채웁니다.
- 에이전트는 사용자에게 키를 채팅창에 붙여넣으라고 요청하지 않습니다. 파일에 직접 입력하도록 안내합니다.
- `.env.local`이 `.gitignore`에 들어 있는지 확인합니다.

### 4-7. 비어 있는 시작 파일 만들기

이 단계에서는 아래 파일을 **최소 내용으로만** 만듭니다. (본 내용은 02, 03 문서 단계에서 작성)

| 파일 | 지금 넣을 내용 |
|------|----------------|
| `public/index.html` | `<!DOCTYPE html>`, `<html lang="ko">`, `<title>무드 플레이리스트</title>`, 본문에 "준비 중" 한 줄 |
| `public/css/fonts.css`, `public/css/style.css` | 빈 파일 |
| `public/js/app.js`, `api.js`, `render.js` | 빈 파일 |
| `api/analyze.js` | 빈 파일 |

---

## 5. 로컬 실행 방법

```bash
vercel dev
```

- 처음 실행하면 Vercel 로그인과 프로젝트 연결 질문이 나옵니다. 사용자와 함께 진행합니다.
  - 로그인: 안내되는 주소를 브라우저에서 열어 승인
  - "Set up and develop?" → `Y`
  - 프로젝트 이름은 `mood-playlist`
  - 기존 설정 덮어쓰기 질문이 나오면 **사용자에게 물어보고** 답함
- 실행되면 `http://localhost:3000` 같은 주소가 나옵니다. 브라우저에서 엽니다.
- `.env.local`의 값은 `vercel dev`가 자동으로 읽습니다.
- **주의**: `public/index.html`을 더블클릭해서 여는 방식(`file://`)으로는 서버 기능이 동작하지 않습니다. 항상 `vercel dev` 주소로 엽니다.

---

## 6. 배포 방법 (Vercel)

1. 사용자가 4~5장 검증을 끝낸 뒤 진행합니다.
2. 배포 전에 `.env.local`이 Git에 포함되지 않았는지 확인합니다.
3. 터미널에서 `vercel --prod` 실행 (또는 GitHub에 올린 뒤 Vercel에서 저장소 연결 — 사용자가 선택)
4. **환경변수 등록**: Vercel 대시보드 → 프로젝트 → Settings → Environment Variables에서 `OPENAI_API_KEY`, `OPENAI_MODEL`을 등록합니다. (사용자가 직접 입력)
5. 환경변수를 추가·수정한 뒤에는 **다시 배포**해야 적용됩니다.
6. 배포 주소(`https://....vercel.app`)에서 `docs/04-verification.md`의 핵심 항목을 다시 확인합니다.

---

## 7. 완료 기준

- [ ] `agents.md` 5장의 폴더·파일이 모두 존재한다 (불필요한 파일은 없다)
- [ ] `package.json`의 `dependencies`에 `openai`만 있고, `"type": "module"`이 설정돼 있다
- [ ] `vercel.json`, `.gitignore`, `.env.example`이 이 문서의 내용과 같다
- [ ] `.env.local`이 존재하고 Git 추적 대상이 아니다
- [ ] `vercel dev` 실행 후 브라우저에서 "준비 중" 페이지가 보인다

## 8. 검증 기준

| 확인 | 방법 | 합격 |
|------|------|------|
| 파일 구조 | 폴더 목록을 출력해 `agents.md` 5장과 비교 | 일치 |
| 패키지 | `package.json` 열어 확인 | `openai`만 존재 |
| 비밀 값 보호 | `.gitignore` 열어 `.env.local` 포함 여부 확인 | 포함됨 |
| 실행 | `vercel dev` → 브라우저 접속 | "준비 중" 표시 |
