import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import backend from 'i18next-http-backend';
import resources from './resources';
export { useTranslation };

const languageKey = 'lang';
const RESOURCE_MAP: { [s: string]: string } = {
    'zh-CN': 'zh_CN',
    'en-US': 'en_US',
    'default': 'zh-CN'
};
// 请求加锁
let flag = false;
i18n
// 加入Backend插件,用于从远程服务器获取国际化资源
// 插件详见: https://github.com/i18next/i18next-http-backend
    .use(backend)
// 探测用户语言
// 插件详见: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
// pass the i18n instance to react-i18next.
    .use(initReactI18next);




i18n.on('languageChanged', (language) => {
    // console.log('file: index.ts ~ line 63 ~ i18n.on ~ language', language);
});

i18n.on('missingKey', (lngs, namespace, key, res) => {
    console.log('file: index.ts ~ line 65 ~ i18n.on ~ lngs, namespace, key, res', lngs, namespace, key, res);
});

export function setCurrentLocale(locale: string) {
    return i18n.changeLanguage(locale).catch(error => {
        console.log('file: index.ts ~ line 66 ~ returni18n.changeLanguage ~ error', error);
    });
}

export function getCurrentLocale() {
    return i18n.language;
}
export function useI18n() {
    function init() {
        return i18n
        // 初始化配置
        // 所有配置详见: https://www.i18next.com/overview/configuration-options
            .init({
                detection: {
                    lookupQuerystring: languageKey,
                    lookupLocalStorage: languageKey,
                    order: ['querystring', 'localStorage', 'navigator'],
                    caches: ['localStorage'],
                },
                backend: {
                    /**
                     * 用于构建请求url
                     * @param lngs 语言编码
                     * @param namespaces 名称空间
                     */
                    loadPath: function (lngs: Array<string>) {
                        const lang = RESOURCE_MAP[lngs[0]] ?? RESOURCE_MAP[RESOURCE_MAP['default']];
                        return `/static/locales/${lang}.json`;
                    },
                    /**
                     * 用于对响应的结果进行结构转化
                     * @param res 原始响应的字符串结果
                     */
                    parse: function (res: string) {
                        const obj = eval('(' + res + ')');
                        return obj;
                    },
                    /**
                     * 是否允许跨域
                     */
                    crossDomain: true,
                    /**
                     * 是否允许携带登录凭证
                     */
                    withCredentials: true,
                },
                react: {
                    // 是否需要在最外层加入Suspense标签
                    useSuspense: false
                },
                // lng: 'zh-CN',
                fallbackLng: 'zh-CN',
                // 是否启用调试模式
                debug: false,
                // 加载当前
                load: 'currentOnly',
                // 本地词条测试
                // resources: resources,
                // 错误词条上报
                saveMissing: true,
                saveMissingTo: 'fallback',
                missingKeyHandler: (lngs, ns, key) => {
                    // 暂不实现 错误词条上报
                    if (flag) {
                        console.log('file: index.ts ~ line 66 ~ lngs, ns, key', lngs, ns, key);
                    }

                },
                interpolation: {
                    escapeValue: false, // not needed for react as it escapes by default
                },
            }, function () {
                // i18n插件初始化完成或异常时的回调函数
                flag = true;
                console.log('国际化插件初始化完毕!');
            }).then(()=>{
                if(!RESOURCE_MAP[getCurrentLocale()]){
                    return setCurrentLocale(RESOURCE_MAP['default']);
                }
            });
    }
    return {
        setCurrentLocale,
        getCurrentLocale,
        init,
    };
}
export default i18n;
