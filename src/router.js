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
      path: "/gitflow",
      name: "gitflow",
      component: () => import("./views/GitFlowPage.vue")
    },
    {
      path: "/vuex",
      name: "vuexTest",
      component: () => import("./views/VuexTestPage.vue")
    },
    {
      path: "/*",
      name: "error404",
      component: () => import("./views/Error404Page.vue")
    }
  ]
})
