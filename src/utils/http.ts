import axios, { AxiosRequestConfig, Canceler } from 'axios';
import { message } from 'antd';
import { getCurrentLocale } from '@/i18n';
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

// star 取消重复请求 ========================
const axiosCancel: {
    pending: { [props: string]: Canceler };
    getPendingKey(req: AxiosRequestConfig): string;
    addCancelToken(req: AxiosRequestConfig): void;
    removePending(req: AxiosRequestConfig): void;
} = {
    pending: {},
    getPendingKey(req) {
        return typeof req.cancel === 'string' ? req.cancel : [req.url, JSON.stringify(req.data), '&', req.method].join('');
    },
    addCancelToken(req) {
        if (req.cancel) {
            this.removePending(req);
            const key: string = this.getPendingKey(req);
            req.cancelToken = new axios.CancelToken(c => {
                this.pending[key] = c;
            });
        }
    },
    removePending(req) {
        const key: string = this.getPendingKey(req);
        this.pending[key]?.();
        delete this.pending[key];
    },
};
// end ========================

// axios 实例
const http = axios.create({
    baseURL: '/api',
    timeout: 6000,
});
// 请求拦截
http.interceptors.request.use(
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
        axiosCancel.addCancelToken(req);
        return req;
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    },
);
// 响应拦截
http.interceptors.response.use(
    response => {
        const requestConfig = response.config;
        if (requestConfig.cancel) {
            axiosCancel.removePending(requestConfig);
        }

        const result = response.data;
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
            return Promise.reject(result);
        }
        switch (response.status) {
            case HTTP_STATUS.NOT_FOUND:
                message.error(response.statusText);
                return Promise.reject({ message: '请求资源不存在' });
            case HTTP_STATUS.BAD_GATEWAY:
                message.error(response.statusText);
                return Promise.reject({ message: '服务端出现了问题' });
            case HTTP_STATUS.FORBIDDEN:
                message.error(response.statusText);
                return Promise.reject({ message: '没有权限访问' });
            case HTTP_STATUS.AUTHENTICATE:
                message.error(response.statusText);
                return Promise.reject({ message: '需要鉴权' });
            case HTTP_STATUS.SERVER_ERROR:
                message.error(response.statusText);
                return Promise.reject({ message: '接口500' });
            case HTTP_STATUS.SUCCESS:
                return response.data.data;
            default:
                break;
        }
    },
    function (error) {
        const requestConfig = error.config;
        if ((requestConfig as AxiosRequestConfig)?.cancel) {
            axiosCancel.removePending(requestConfig);
        }
        if (axios.isCancel(error)) {
            return Promise.reject(error);
        }

        message.error(error.message);
        return Promise.reject(error);
    },
);

export { http };
