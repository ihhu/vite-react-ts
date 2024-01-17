import React from 'react';
import ReactDOM from 'react-dom/client';
import 'uno.css';
import '@/assets/less/index.less';
import App from './App';

function render(root: Element) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
//
render(document.getElementById('root') ?? document.body.appendChild(document.createElement('div')));
