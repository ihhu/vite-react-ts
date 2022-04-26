import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import 'antd/lib/style/index.less';
import '@/assets/less/index.less';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <RecoilRoot>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </RecoilRoot>
);
