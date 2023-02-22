import router from '.'
import store from "@/store"

// rollup使用import时不能传变量， 所以这里使用import.meta.glob
let modules = import.meta.glob("../views/**/index.js")

// 递归处理routers
function dealWithTree (tree) {
  let res = tree.map(i => {
    const item = {
      path: i.url || '/',
      name: i.name || i.text || i.url,
      icon: i.icon || '',
      component: i.component || (i.leaf ? modules[`../views/${(i.name)}/index.js`] : ''),
      meta: i.meta || '',
    }
    if (i.children) {
      item.children = dealWithTree(i.children)
    }
    return item
  })
  return res
}


export function generateRoutes () {
  let menus = store.state.menu
  // 连接内部路由
  const list = [
    {
      path: '/',
      name: 'layout',
      component: () => import('../layout/index.js'),
      children: dealWithTree(store.state.menu)
    }
  ]
  return list
}
