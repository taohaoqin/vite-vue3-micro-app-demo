import { createRouter, createWebHistory } from "vue-router"
import { generateRoutes } from "@/router/generatorRouters.js"

//主应用用history模式
export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...generateRoutes(),
  ],
})
