import { createApp } from "vue"
import "./style.css"
import router from "./router"
import store from "./store"
import App from "./App.vue"
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import * as ElementPlusIconsVue from "@element-plus/icons-vue"
import {
  isMicroApp,
  sendMicroData,
  handleMicroData,
  clearDataListener
  // getGlobalData, 
  // addGlobalDataListener 
} from '@/micro-app'

let app = null
function mount () {
  app = createApp(App)
  app.use(router)
  app.use(store)
  app.use(ElementPlus)
  app.mount("#vite-app")
  handleMicroData()
  // 向基座发送数据
  // setTimeout(() => {
  //   sendMicroData('emit', { msg: '来自子应用的数据' })
  // }, 3000)
  // console.log(getGlobalData())
  // addGlobalDataListener((e) => {
  //   console.log(e)
  // }, true)
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}

function unmount () {
  app?.unmount()
  // 卸载所有数据监听函数
  clearDataListener()
  app = null
}
if (isMicroApp()) {
  window['micro-app-vite-child'] = { mount, unmount }
} else {
  // 非微前端环境直接渲染
  mount()
}



