import Vue from 'vue'
import Notifications from 'vue-notification'
import VueCoreVideoPlayer from 'vue-core-video-player'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import '@/css/fonts.scss'
// import '@/css/variables.scss'
Vue.use(Notifications)
Vue.use(VueCoreVideoPlayer)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
