import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
import { writeFileSync } from 'fs'
import { join } from 'path'
// https://vitejs.dev/config/

function pathResolve (dir) {
  return resolve(process.cwd(), '.', dir)
}

export default defineConfig({
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
    port: 4001,
    host: true,
  },
  base: `/child/`,
  build: {
    outDir: 'vite',
  },
  plugins: [
    vueJsx(),
    vue(),
    (function () {
      let basePath = ''
      return {
        name: "vite:child",
        apply: 'build',
        configResolved (config) {
          basePath = `${config.base}${config.build.assetsDir}/`
        },
        writeBundle (options, bundle) {
          for (const chunkName in bundle) {
            if (Object.prototype.hasOwnProperty.call(bundle, chunkName)) {
              const chunk = bundle[chunkName]
              if (chunk.fileName && chunk.fileName.endsWith('.js')) {
                chunk.code = chunk.code.replace(/(from|import\()(\s*['"])(\.\.?\/)/g, (all, $1, $2, $3) => {
                  return all.replace($3, new URL($3, basePath))
                })
                const fullPath = join(options.dir, chunk.fileName)
                writeFileSync(fullPath, chunk.code)
              }
            }
          }
        },
      }
    })(),
  ],
})
