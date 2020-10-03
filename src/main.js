import Vue from 'vue'
// import CourseCard from 'nails-courses-card'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import '@/css/fonts.scss'
// import '@/css/variables.scss'
// Vue.use(CourseCard)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
