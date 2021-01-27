import Vue from 'vue';
import VueCoreVideoPlayer from 'vue-core-video-player';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

import '@/css/fonts.scss';
// import '@/css/variables.scss'
Vue.config.productionTip = false;

Vue.use(VueCoreVideoPlayer, {
  lang: 'en_AU'
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
