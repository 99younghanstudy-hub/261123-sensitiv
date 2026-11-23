/**
 * api.js - 서버 호출 담당
 */

export async function analyzeText(text) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000); // 30초 제한

  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
      signal: controller.signal,
    });

    let resJson;
    try {
      resJson = await response.json();
    } catch {
      const err = new Error('알 수 없는 오류가 발생했습니다.');
      err.code = 'UNKNOWN';
      throw err;
    }

    if (resJson && resJson.ok && resJson.data) {
      return resJson.data;
    }

    if (resJson && resJson.error && resJson.error.message) {
      const err = new Error(resJson.error.message);
      err.code = resJson.error.code || 'UNKNOWN';
      throw err;
    }

    const err = new Error('알 수 없는 오류가 발생했습니다.');
    err.code = 'UNKNOWN';
    throw err;
  } catch (error) {
    if (error.name === 'AbortError') {
      const err = new Error('응답이 너무 오래 걸립니다. 다시 시도해 주세요.');
      err.code = 'TIMEOUT';
      throw err;
    }

    // fetch 자체 실패(오프라인, 네트워크 끊김)
    if (error instanceof TypeError) {
      const err = new Error('네트워크 연결을 확인해 주세요.');
      err.code = 'NETWORK_ERROR';
      throw err;
    }

    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}
