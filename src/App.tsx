import React, { useState } from 'react';
import { ConfigProvider } from 'antd';
import './App.less';
import Router from '@/router/index';

function App() {
    const [count, setCount] = useState(0);

    return (
        <ConfigProvider>
            <div className="App">
                <header className="App-header">
                    <p>Hello Vite + React!</p>
                    <Router></Router>
                    <p>
                        <button type="button" onClick={() => setCount(count => count + 1)}>
              count is: {count}
                        </button>
                    </p>
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
