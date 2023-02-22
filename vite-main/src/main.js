import { createApp } from "vue"
import "./style.css"
import router from "./router"
import store from "./store"
import App from "./App.vue"
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import * as ElementPlusIconsVue from "@element-plus/icons-vue"
import microApp from '@micro-zoe/micro-app'
import { setGlobalData, sendMicroData, appConfigs } from '@/micro-app'

microApp.start({
  plugins: {
    modules: {
      'vite-child': [
        {
          loader (code) {
            if (process.env.NODE_ENV === 'development') {
              // 这里 /basename/ 需要和子应用vite.config.js中base的配置保持一致
              code = code.replace(/(from|import)(\s*['"])(\/child\/)/g, all => {
                return all.replace('/child/', 'http://localhost:4001/child/')
              })
            }
            return code
          }
        }
      ],
    }
  }
})

// 解决子应用跳转问题
router.beforeEach((to) => {
  const app = appConfigs.find(i => i.fullPath.includes(to.fullPath))
  if (app && app.fullPath !== to.fullPath) {
    router.replace(app.fullPath)
  } else {
    return true
  }
})

// 解决子应用跳转问题
router.afterEach((to) => {
  setTimeout(() => {
    if (to.hash !== location.hash) {
      const path = to.hash.substring(1)
      sendMicroData('router', { api: 'replace', route: { path } })
    }
  })
})

const app = createApp(App)

app.use(router)
app.use(store)
app.use(ElementPlus)

setGlobalData({ msg: '这是全局数据' })
// 设置全局变量
// app.config.globalProperties.$f = () => {
//   console.log("main.js 全局方法")
// }
// app.config.globalProperties.$variable = 'main.js 全局变量'
// 获取全局变量
// const { proxy } = getCurrentInstance()
//     proxy.$f()
//     console.log(proxy.$variable)

app.mount("#app")

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
