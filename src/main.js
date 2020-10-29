import Vue from 'vue'
import Notifications from 'vue-notification'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import '@/css/fonts.scss'
// import '@/css/variables.scss'
Vue.use(Notifications)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
