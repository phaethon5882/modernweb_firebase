import Vue from "vue"
import Router from "vue-router"
import Home from "./views/HomePage.vue"

Vue.use(Router)

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: () => import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/about2",
      name: "about2",
      component: () => import("./views/About2.vue")
    },
    {
      path: "/gitgraph",
      name: "gitgraph",
      component: () => import("./views/GitGraphPage.vue")
    },
    {
      path: "/*",
      name: "404",
      component: () => import("./views/e404.vue")
    }
  ]
})
