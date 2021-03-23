import Vue from 'vue';
import VueVideoPlayer from 'vue-video-player'
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

import ErrorMessage from '@/components/popups/error.vue'
import Message from '@/components/popups/message.vue'

import '@/css/fonts.scss';
Vue.config.productionTip = false;

import 'video.js/dist/video-js.css'

Vue.prototype.maps = () => window?.google?.maps

Vue.use(VueVideoPlayer)
Vue.component('error-message', ErrorMessage)
Vue.component('simple-message', Message)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
