import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import LanguageDetector from 'i18next-browser-languagedetector';
import resources from './resources';

// 请求加锁
let flag = false;
i18n
// 探测用户语言
// 插件详见: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
// pass the i18n instance to react-i18next.
    .use(initReactI18next)
// 初始化配置
// 所有配置详见: https://www.i18next.com/overview/configuration-options
    .init({
        react: {
            // 是否需要在最外层加入Suspense标签
            useSuspense: false
        },
        // 设置默认语言
        lng: 'zh-CN',
        fallbackLng: 'zh-CN',
        // 是否启用调试模式
        debug: false,
        // 加载当前
        load: 'currentOnly',
        // 本地词条测试
        resources: resources,
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
    });

export default i18n;
