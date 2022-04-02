import fs from 'fs';
import path from 'path';
// 完整的 React 支持 https://github.com/vitejs/vite/tree/main/packages/plugin-react
import react from '@vitejs/plugin-react';
// 兼容代码 https://github.com/vitejs/vite/tree/main/packages/plugin-legacy
import legacy from '@vitejs/plugin-legacy';
// 按需引入 https://github.com/onebay/vite-plugin-imp/issues
import imp from 'vite-plugin-imp';
// 模块加载情况 https://github.com/antfu/vite-plugin-inspect
import inspect from 'vite-plugin-inspect';
// https://github.com/michaeltaranto/less-vars-to-js
import lessToJS from 'less-vars-to-js';


import { defineConfig } from 'vite';
import { path as _path, server, env, alias } from './config';

const themeVariables = lessToJS(
    fs.readFileSync(path.join(_path.src, 'antd', 'variables.less'), 'utf8')
);

// base config
const base = defineConfig({
    ...env,
    base: _path.base,
    publicDir: _path.publicDir,
    resolve: { alias },
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
                // 重写 less 变量，定制样式
                modifyVars: themeVariables,
                additionalData:'@import "@/assets/less/mixin.less";'
            }
        }
    }
});

// dev config
const dev = defineConfig({
    server
});

// build config
const build = defineConfig({
    build: {
        outDir: _path.outDir,
        assetsDir: _path.assetsDir,
    }
});

// https://vitejs.dev/config/
export default defineConfig({
    ...base,
    ...dev,
    ...build,
    plugins: [
        react(),
        imp({
            libList: [
                {
                    libName: 'antd',
                    style: (name) => {
                        if (name === 'col' || name === 'row') {
                            return 'antd/lib/style/index.less';
                        }
                        return `antd/es/${name}/style/index.less`;
                    }
                }
            ]
        }),
        legacy({
            targets: ['defaults', 'not IE 11']
        }),
        inspect()
    ]
});
