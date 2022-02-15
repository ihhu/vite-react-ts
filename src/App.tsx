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
            <div className="App">
                <header className="App-header">
                    <p>Hello Vite + React!</p>
                    <Routers></Routers>
                    <p>
            Edit <code>App.tsx</code> and save to test HMR updates.
                    </p>
                    <p>
                        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
              Learn React
                        </a>
                        {' | '}
                        <a className="App-link" href="https://vitejs.dev/guide/features.html" target="_blank" rel="noopener noreferrer">
              Vite Docs
                        </a>
                    </p>
                </header>
            </div>
        </ConfigProvider>
    );
}

export default App;
