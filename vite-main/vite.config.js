import { defineConfig, searchForWorkspaceRoot } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
// https://vitejs.dev/config/

function pathResolve (dir) {
  return resolve(process.cwd(), '.', dir)
}

export default defineConfig({
  plugins: [vue({
    template: {
      compilerOptions: {
        isCustomElement: tag => /^micro-app/.test(tag)
      }
    }
  }), vueJsx()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: pathResolve('src')
      },
    ],
    dedupe: ['vue']
  },
  server: {
    host: true,
    fs: {
      allow: [
        searchForWorkspaceRoot(process.cwd()),
        '/mygit/micro-zoe/micro-app/'
      ]
    }
  },
  base: '/vite-main/',
  build: {
    outDir: 'vite-main',
  },
})
