import './App.less';
import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import * as localeState from '@/recoil/locale';
import { ConfigProvider } from 'antd';
import Routers from '@/router/index';

import i18n from '@/i18n';

import en_US from 'antd/lib/locale/en_US';
import zh_CN from 'antd/lib/locale/zh_CN';
const LOCALE = {
    'zh-CN': zh_CN,
    'en-US': en_US,
};
function App() {
    const currentLocale = useRecoilValue(localeState.currentLocal);
    useEffect(() => {
        i18n.init({
            lng: currentLocale,
            fallbackLng: currentLocale,
        });
    }, [currentLocale]);

    return (
        <ConfigProvider locale={LOCALE[currentLocale]}>
            <Routers></Routers>
        </ConfigProvider>
    );
}

export default App;
