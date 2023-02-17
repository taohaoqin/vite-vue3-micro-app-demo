import router from '.'
import store from "@/store"

let modules = import.meta.glob("../views/**/index.js")

function dealWithTree (tree) {
  let res = tree.map(i => {
    const item = {
      path: i.url,
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
      children: dealWithTree(menus)
    }
  ]
  return list
}
