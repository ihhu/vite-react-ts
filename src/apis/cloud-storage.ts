import { OssTokenInfo } from '@/interface';
import { http } from '@/utils/http';

export function getOssToken() {
  return http.post<OssTokenInfo, OssTokenInfo>('/cloud-storage/oss-token');
}
