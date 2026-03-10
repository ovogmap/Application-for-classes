const apiBaseUrl = process.env.API_BASE_URL;

if (!apiBaseUrl) {
  throw new Error("API_BASE_URL 환경변수가 설정되지 않았습니다.");
}

export const API_BASE_URL = apiBaseUrl;
