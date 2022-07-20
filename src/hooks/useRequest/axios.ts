// 半成品 vue3代码改造https://juejin.cn/post/7100804171388944398#heading-9
// /src/hooks/useRequest/axios.ts

import { AppAxiosResponse, RequestResponse } from './types';
import axios, { AxiosRequestConfig, Canceler } from 'axios';
import { useRef } from 'react';

import { getCurrentLocale } from '@/i18n';
import { message } from 'antd';
// HTTP 返回的状态码
const HTTP_STATUS = {
    SUCCESS: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NOT_AUTH: 100,
    CLIENT_ERROR: 400,
    AUTHENTICATE: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
    REFRESH_PAGE: 800,
};

const instance = axios.create({
    baseURL: '/api',
    timeout: 6 * 1000,
});
instance.interceptors.request.use(
    req => {
        if (req.headers) {
            req.headers['Accept-Language'] = getCurrentLocale();
        }
        const exData = {
            clientTimestamp: Date.now(),
        };
        switch (req.method) {
            case 'get':
                req.params = Object.assign({}, exData, req.params);
                break;
            case 'post':
            default:
                req.data = Object.assign({}, exData, req.data);
                break;
        }
        return req;
    },
    err => {
        console.log('request-error', err);
        return Promise.reject(err);
    }
);
instance.interceptors.response.use(
    (res: AppAxiosResponse) => {
        switch (res.status) {
            case HTTP_STATUS.NOT_FOUND:
                message.error(res.statusText);
                return Promise.reject({ message: '请求资源不存在' });
            case HTTP_STATUS.BAD_GATEWAY:
                message.error(res.statusText);
                return Promise.reject({ message: '服务端出现了问题' });
            case HTTP_STATUS.FORBIDDEN:
                message.error(res.statusText);
                return Promise.reject({ message: '没有权限访问' });
            case HTTP_STATUS.AUTHENTICATE:
                message.error(res.statusText);
                return Promise.reject({ message: '需要鉴权' });
            case HTTP_STATUS.SERVER_ERROR:
                message.error(res.statusText);
                return Promise.reject({ message: '接口500' });
            case HTTP_STATUS.SUCCESS: {
                const result = res.data;
                if (result?.code === HTTP_STATUS.SUCCESS) {
                    return result.data;
                }
                if (result?.message) {
                    message.error(result.message, () => {
                        // 刷新页面
                        if (result.code === HTTP_STATUS.REFRESH_PAGE) {
                            window.location.reload();
                        }
                        // 未登录
                        if (result.code === HTTP_STATUS.NOT_AUTH) {
                            // TODO 未登录
                        }
                    });
                }
                return Promise.reject(result);
            }
            default:
                break;
        }

        return res;
    },
    err => {
        if (axios.isCancel(err)) {
            return Promise.reject({
                code: 10000,
                message: 'Cancel',
                data: null,
            });
        }
        if (err.code === 'ECONNABORTED') {
            return Promise.reject({
                code: 10001,
                message: '超时',
                data: null,
            });
        }
        console.log('response-error', err.toJSON());
        return Promise.reject(err);
    }
);

export function request<T>(config: AxiosRequestConfig): RequestResponse<T> {
    const cancel = useRef<Canceler>();
    return {
        instance: instance({
            ...config,
            cancelToken: new axios.CancelToken(c => {
                cancel.current = c;
            }),
        }),
        cancel: cancel.current,
    };
}

export function post<T, K extends Record<string, any>>(url: string, data: K, config: AxiosRequestConfig): RequestResponse<T> {
    const cancel = useRef<Canceler>();
    return {
        instance: instance.post(url, data, {
            ...config,
            cancelToken: new axios.CancelToken(c => {
                cancel.current = c;
            }),
        }),
        cancel: cancel.current,
    };
}
