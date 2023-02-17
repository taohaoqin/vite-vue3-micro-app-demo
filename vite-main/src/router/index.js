import { createRouter, createWebHistory } from "vue-router"
import { generateRoutes } from "@/router/generatorRouters.js"
export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...generateRoutes(),
  ],
})
