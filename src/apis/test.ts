import { http } from '@/utils/http';

export function getIndex(config?: { signal: AbortSignal }) {
  return http.get<string, string>('/static/locales/zh_CN.json', {
    ...config
  });
}
