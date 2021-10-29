import path from "path";
import { ServerOptions } from "vite";


const server: ServerOptions = {
  host: "0.0.0.0",
  proxy: {
    '/api': {
      target: 'http://localhost',
      changeOrigin: true,
    },
  }
}

const _path = {
  cwd: process.cwd(),
  src: path.join(process.cwd(), 'src'),
  base: "/",
  outDir: "dist",
  assetsDir: "assets",
  publicDir: "public",
}

const env = {
  envDir: ".",
  envPrefix: "VITE_"
}

const alias = {
  "~": path.join(_path.cwd),
  "@": path.join(_path.cwd, "src")
}

export {
  _path as path,
  server,
  env,
  alias
}