/**
 * render.js - 화면 상태 전환과 그리기 담당
 */

const loadingEl = document.getElementById('loading');
const errorBoxEl = document.getElementById('error-box');
const errorMessageEl = document.getElementById('error-message');
const supportNoticeEl = document.getElementById('support-notice');
const resultEl = document.getElementById('result');
const resultEmotionEl = document.getElementById('result-emotion');
const resultIntensityEl = document.getElementById('result-intensity');
const resultSummaryEl = document.getElementById('result-summary');
const resultReasonEl = document.getElementById('result-reason');
const playlistListEl = document.getElementById('playlist-list');
const submitBtnEl = document.getElementById('submit-btn');
const userTextEl = document.getElementById('user-text');

export function resetView() {
  loadingEl.hidden = true;
  errorBoxEl.hidden = true;
  supportNoticeEl.hidden = true;
  resultEl.hidden = true;

  errorMessageEl.textContent = '';
  resultEmotionEl.textContent = '';
  resultIntensityEl.textContent = '';
  resultSummaryEl.textContent = '';
  resultReasonEl.textContent = '';

  while (playlistListEl.firstChild) {
    playlistListEl.removeChild(playlistListEl.firstChild);
  }
}

export function showLoading() {
  resetView();
  loadingEl.hidden = false;

  submitBtnEl.disabled = true;
  userTextEl.readOnly = true;
}

export function showError(message) {
  resetView();
  errorMessageEl.textContent = message;
  errorBoxEl.hidden = false;

  submitBtnEl.disabled = false;
  userTextEl.readOnly = false;

  errorBoxEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

export function showResult(data) {
  resetView();

  resultEmotionEl.textContent = data.primary_emotion;
  resultIntensityEl.textContent = `강도 ${data.intensity} / 5`;
  resultSummaryEl.textContent = data.summary;
  resultReasonEl.textContent = data.reason;

  if (data.needs_support_notice === true) {
    supportNoticeEl.hidden = false;
  }

  if (Array.isArray(data.recommendations)) {
    for (const rec of data.recommendations) {
      const li = document.createElement('li');
      li.className = 'playlist-item';

      const h3 = document.createElement('h3');
      h3.className = 'playlist-title';
      h3.textContent = rec.title;
      li.appendChild(h3);

      const p = document.createElement('p');
      p.className = 'playlist-desc';
      p.textContent = rec.description;
      li.appendChild(p);

      if (typeof rec.youtube_url === 'string' && rec.youtube_url.startsWith('https://www.youtube.com/')) {
        const a = document.createElement('a');
        a.className = 'playlist-link';
        a.href = rec.youtube_url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.textContent = '유튜브에서 보기';
        li.appendChild(a);
      }

      playlistListEl.appendChild(li);
    }
  }

  resultEl.hidden = false;

  submitBtnEl.disabled = false;
  userTextEl.readOnly = false;

  resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
