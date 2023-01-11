import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import store from './store'

import router from '@/routes'
import vuetify from './plugins/vuetify'


Vue.use(VueRouter)
Vue.config.productionTip = false


new Vue({
  store,
  render: h => h(App),
  el: '#app',
  vuetify,
  router
})
