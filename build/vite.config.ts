import { readFileSync } from 'fs';
import { join } from 'path';
// 完整的 React 支持 https://github.com/vitejs/vite/tree/main/packages/plugin-react
import react from '@vitejs/plugin-react';

// 按需引入 https://github.com/onebay/vite-plugin-imp/issues
// antd5 不再需要按需引入插件
// import imp from 'vite-plugin-imp';

// https://github.com/michaeltaranto/less-vars-to-js
import lessToJS from 'less-vars-to-js';

// 浏览器兼容处理 https://github.com/vitejs/vite/tree/main/packages/plugin-legacy
// import legacy from '@vitejs/plugin-legacy';

// 自动生成https证书 配合 server.https 使用
// import basicSsl from '@vitejs/plugin-basic-ssl'

import UnoCSS from 'unocss/vite';

import { defineConfig } from 'vite';
import { dir, server, env, alias } from './config';

const themeVariables = lessToJS(readFileSync(join(dir.src, 'assets', 'less', 'variables.less'), 'utf8'));

// base config
const base = defineConfig({
  ...env,
  base: dir.base,
  publicDir: dir.publicDir,
  resolve: { alias },
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        // 重写 less 变量，定制样式
        modifyVars: themeVariables,
        additionalData: '@import "@/assets/less/mixin.less";'
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
    // minify:false,
    outDir: dir.outDir,
    assetsDir: dir.assetsDir
  }
});

// https://vitejs.dev/config/
export default defineConfig({
  ...base,
  ...dev,
  ...build,
  plugins: [
    react(),
    UnoCSS({ configFile: join(dir.cwd, './unocss.config.ts') })
    // basicSsl(),
    /* legacy({
        targets: ['defaults', 'not IE 11']
    }) */
  ]
});
