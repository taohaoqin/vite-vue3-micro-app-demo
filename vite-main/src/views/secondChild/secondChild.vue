<template>
  <div>
    <micro-app
      v-bind="genMicroAppProps('vite-child')"
      disablesandbox
      :data='microAppData'
      @mounted='handleMount'
    ></micro-app>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue"
import microApp, { EventCenterForMicroApp } from '@micro-zoe/micro-app'
import { genMicroAppProps, sendMicroData, appConfigs } from '@/micro-app'

//当子应用是vite应用时需要做特别的适配，适配vite的代价是巨大的，我们必须关闭沙箱功能，因为沙箱在module script下不支持，这导致大部分功能失效，包括：环境变量、样式隔离、元素隔离、资源路径补全、baseroute 等。
//因为vite子应用关闭了沙箱，我们需要为子应用appname-vite创建EventCenterForMicroApp对象来实现数据通信
if (!window.eventCenterForAppNameVite) {
  window.eventCenterForAppNameVite = new EventCenterForMicroApp('vite-child')
}

let microAppData = reactive({ msg: '来自基座的数据' })
function handleMount () {
  const pathname = window.location.pathname
  const hash = window.location.hash
  const app = appConfigs.find(i => {
    return pathname.includes(i.fullPath.split('#')[0])
  })
  if (app) {
    const path = app.fullPath.split('#').at(-1)
    if (hash !== path) {
      sendMicroData('router', { api: 'replace', route: { path } })
    }
  }

}

</script>
