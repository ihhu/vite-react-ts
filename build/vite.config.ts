import fs from 'fs';
import {join} from 'path';
// 完整的 React 支持 https://github.com/vitejs/vite/tree/main/packages/plugin-react
import react from '@vitejs/plugin-react';
// 兼容代码 https://github.com/vitejs/vite/tree/main/packages/plugin-legacy
import legacy from '@vitejs/plugin-legacy';
// 按需引入 https://github.com/onebay/vite-plugin-imp/issues
import imp from 'vite-plugin-imp';
// https://github.com/michaeltaranto/less-vars-to-js
import lessToJS from 'less-vars-to-js';


import { defineConfig } from 'vite';
import { dir, server, env, alias } from './config';

const themeVariables = lessToJS(
    fs.readFileSync(join(dir.src, 'assets', 'less',  'variables.less'), 'utf8')
);

// base config
const base = defineConfig({
    ...env,
    base: dir.base,
    publicDir: dir.publicDir,
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
        outDir: dir.outDir,
        assetsDir: dir.assetsDir,
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
                        return `antd/es/${ name }/style`;
                    }
                }
            ]
        }),
        legacy({
            targets: ['defaults', 'not IE 11']
        })
    ]
});
