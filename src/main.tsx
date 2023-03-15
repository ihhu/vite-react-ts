import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import '@/assets/less/index.less';
import App from './App';

function render(root: Element) {
    ReactDOM.createRoot(root).render(
        <RecoilRoot>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </RecoilRoot>
    );
}
//
render(document.getElementById('root') ?? document.body.appendChild(document.createElement('div')));
