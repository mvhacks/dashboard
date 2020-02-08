import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
export const bus = new Vue();
export const logindata = new Vue({
  data: {
    logindata: ""
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
