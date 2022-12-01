import 'antd/dist/reset.css';
import './App.less';
import { useState, useEffect } from 'react';
import { ConfigProvider } from 'antd';
import Routers from '@/router/index';

import { useI18n } from '@/i18n';

import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';
const LOCALE: Record<string, typeof zhCN> = {
    'zh-CN': zhCN,
    'en-US': enUS,
    default: zhCN,
};

function App() {
    const { init, getCurrentLocale } = useI18n();
    const [loading, setLoading] = useState(false);
    const [locale, setLocale] = useState(LOCALE['default']);
    useEffect(() => {
        init().then(() => {
            setLoading(false);
            setLocale(LOCALE[getCurrentLocale()] ?? LOCALE['default']);
        });
    }, []);

    return <ConfigProvider locale={locale}>{!loading ? <Routers /> : null}</ConfigProvider>;
}

export default App;
