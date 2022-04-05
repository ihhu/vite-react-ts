import { AxiosRequestConfig } from 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    loading?: boolean,
    cancel?:boolean
  }
} 