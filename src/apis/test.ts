import { http } from '@/utils/http';

export function getIndex(config?: { signal: AbortSignal }) {
  return http.get<string, string>('http://localhost:5173/static/locales/zh_CN.json', {
    ...config,
  });
}
