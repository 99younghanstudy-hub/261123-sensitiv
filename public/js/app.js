/**
 * app.js - 이벤트 연결, 입력 검사, 전체 흐름
 */

import { analyzeText } from './api.js';
import { showLoading, showError, showResult } from './render.js';

let isSubmitting = false;

export function init() {
  const formEl = document.getElementById('input-form');
  const userTextEl = document.getElementById('user-text');
  const charCountEl = document.getElementById('char-count');

  if (!formEl || !userTextEl || !charCountEl) return;

  // 글자 수 실시간 갱신
  userTextEl.addEventListener('input', () => {
    const currentLength = userTextEl.value.length;
    charCountEl.textContent = `${currentLength} / 500`;
  });

  // Ctrl + Enter (Mac: Cmd + Enter) 제출
  userTextEl.addEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      event.preventDefault();
      formEl.requestSubmit();
    }
  });

  // 폼 제출 이벤트
  formEl.addEventListener('submit', async (event) => {
    event.preventDefault();

    const text = userTextEl.value.trim();

    if (text.length === 0) {
      showError('분석할 내용을 입력해 주세요.');
      return;
    }

    if (text.length > 500) {
      showError('500자 이하로 입력해 주세요.');
      return;
    }

    if (isSubmitting) {
      return;
    }

    isSubmitting = true;
    showLoading();

    try {
      const data = await analyzeText(text);
      showResult(data);
    } catch (error) {
      showError(error.message || '알 수 없는 오류가 발생했습니다.');
    } finally {
      isSubmitting = false;
    }
  });
}

document.addEventListener('DOMContentLoaded', init);
