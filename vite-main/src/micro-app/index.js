import microApp from '@micro-zoe/micro-app'
// micro-app配置appname和对应的url
export const appUrlEnums = new Map([
  ['vite-child', { development: '//localhost:4001/child', test: `//${location.host}/child` }],
])

//子应用菜单配置 一个子应用可能对应多个菜单
export const appConfigs = [
  {
    path: '/firstChild',
    name: 'vite-child'
  },
  {
    path: '/secondChild',
    name: 'vite-child'
  }
]

//  生成指定子应用 props（用于<micro-app>组件上使用）
export function genMicroAppProps (appName) {
  const app = appUrlEnums.get(appName)
  if (!app) throw new Error(`[${appName}] is not exist in appUrlEnums!`)
  const env = process.env.NODE_ENV || 'development'
  return {
    name: appName,
    url: app[env]
    // baseroute: app['baseroute']
  }
}

// 获取当前子应用模块对应的appname
export function getCurrentAppName () {
  console.log(window.location.pathname)
  const hash = window.location.pathname.split('/')?.at(-1)
  console.log(hash);
  const item = appConfigs.find(i => i.path.includes(hash))
  return item ? item.name : ''
}

// 父子通信交互事件类型（可自定义扩展）
export const EventType = ['init', 'router']

// 向子应用发送数据
export function sendMicroData (type, data, appName = getCurrentAppName()) {
  if (EventType.includes(type) && appUrlEnums.has(appName)) {
    microApp.setData(appName, { type, data })
  } else {
    throw new Error(`option appName 【${appName}】 or type 【${type}】 is invalid!`)
  }
}

export function addListener (listenerType, callback, appName = getCurrentAppName(), autoTrigger = false) {
  microApp.addDataListener(appName, ({ type, data }) => {
    if (listenerType === type) callback(data)
  }, autoTrigger)
}

// 设置全局数据
export function setGlobalData (data) {
  if (Object.prototype.toString.call(data) === '[object Object]') {
    microApp.setGlobalData(data)
  } else {
    throw new Error(`设置全局的数据类型必须是个object`)
  }
}

// 获取全局数据 
export function getGlobalData () {
  return microApp.getGlobalData()
}

// 监听全局数据
export function addGlobalDataListener (cb, autoTrigger = false) {
  microApp.addGlobalDataListener(cb, autoTrigger)
}

// 解除全局数据的监听函数
export function removeGlobalDataListener (cb) {
  microApp.removeGlobalDataListener(cb)
}

// 清空全局数据的监听函数
export function clearGlobalDataListener () {
  if (!isMicroApp()) return
  microApp.clearGlobalDataListener()
}