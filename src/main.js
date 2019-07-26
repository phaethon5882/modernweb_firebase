import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import vuetify from "./plugins/vuetify"
import VueMq from "vue-mq"

Vue.config.productionTip = false

Vue.use(VueMq, {
  breakpoints: {
    mobile: 600,
    tablet: 800,
    laptop: 970,
    desktop: 1170
  }
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app")
