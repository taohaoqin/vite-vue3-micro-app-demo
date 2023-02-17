import { createRouter, createWebHashHistory } from "vue-router"
// import { generateRoutes } from "@/router/generatorRouters.js"
export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: () => import('../layout/index.js'),
      children: [
        {
          path: "/one",
          name: "one",
          component: () => import('../views/one/index.js'),
        },
        {
          path: "/two",
          name: "two",
          component: () => import('../views/two/index.js'),
        },
        {
          path: "/three",
          name: "three",
          component: () => import('../views/three/index.js'),
        },
      ]
    },
    // {
    //   path: "/index",
    //   name: "index",
    //   component: index,
    // },
    // ...generateRoutes(),
  ],
})
