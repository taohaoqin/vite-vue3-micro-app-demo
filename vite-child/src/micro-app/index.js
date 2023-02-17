import router from "@/router"

export function isMicroApp () {
  return window.__MICRO_APP_BASE_APPLICATION__
}

export const EventType = ['init', 'router', 'emit']

export function sendMicroData (type, data = {}) {
  if (!isMicroApp()) return
  if (EventType.includes(type)) {
    window.eventCenterForAppNameVite.dispatch({ type, data })
  } else {
    throw new Error(`【${type}】 is not exists in EventType!`)
  }
}

// 不同事件类型对应的回调函数，可以扩展
const EventCallback = {
  router: (e) => {
    const { api, route } = e.data
    router[api](route)
  }
}

export function handleMicroData () {
  if (window.eventCenterForAppNameVite) {
    // 主动获取基座下发的数据
    console.log('获取父应用传递的数据', getMicroData())
    // 监听基座下发的数据变化
    addDataListener((e) => {
      console.log('监听父应用传递的数据', e)
      if (EventCallback[e.type]) {
        EventCallback[e.type](e)
      }
    })
  }
}

export function getMicroData () {
  if (!isMicroApp()) return
  return window.eventCenterForAppNameVite.getData()
}

export function addDataListener (cb, autoTrigger = false) {
  if (!isMicroApp()) return
  window.eventCenterForAppNameVite.addDataListener(cb, autoTrigger)
}

export function clearDataListener () {
  if (!isMicroApp()) return
  window.eventCenterForAppNameVite.clearDataListener()
}

// 设置全局数据
export function setGlobalData (data) {
  if (!isMicroApp()) return
  if (Object.prototype.toString.call(data) === '[object Object]') {
    window.eventCenterForAppNameVite.setGlobalData(data)
  } else {
    throw new Error(`设置全局的数据类型必须是个object`)
  }
}

// 获取全局数据 
export function getGlobalData () {
  if (!isMicroApp()) return
  return window.eventCenterForAppNameVite.getGlobalData()
}

// 监听全局数据
export function addGlobalDataListener (cb, autoTrigger = false) {
  if (!isMicroApp()) return
  window.eventCenterForAppNameVite.addGlobalDataListener(cb, autoTrigger)
}

// 解除全局数据的监听函数
export function removeGlobalDataListener (cb) {
  if (!isMicroApp()) return
  window.eventCenterForAppNameVite.removeGlobalDataListener(cb)
}

// 清空全局数据的监听函数
export function clearGlobalDataListener () {
  if (!isMicroApp()) return
  window.eventCenterForAppNameVite.clearGlobalDataListener()
}