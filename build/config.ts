import { join } from 'path';
import { ServerOptions } from 'vite';


const server: ServerOptions = {
  host: '0.0.0.0',
  proxy: {
    '/api': {
      target: 'http://localhost',
      changeOrigin: true,
    },
  }
};

const dir = {
  cwd: process.cwd(),
  src: join(process.cwd(), 'src'),
  base: '/',
  outDir: 'dist',
  assetsDir: 'assets',
  publicDir: 'public',
};

const env = {
  envDir: '.',
  envPrefix: 'VITE_'
};

const alias = {
  '~': join(dir.cwd),
  '@': join(dir.cwd, 'src')
};

export {
  dir,
  server,
  env,
  alias
};