<template>
  <v-app dark>
    <v-container fluid class="mx-auto homefone">
      <SystemBar />
      <MainMenu
        v-if="
          maimMenuShowInRouteNames.includes(this.$route.name) &&
          viewportWidth > 900
        "
      />
      <v-main class="main-content">
        <component :is="layout">
          <!-- <router-view /> -->
        </component>
      </v-main>
      <Footer />
    </v-container>
    <notifications group="foo" position="top center"/>
  </v-app>
</template>

<style>
html,
body,
.v-application {
  font-family: "Arial" !important;
}
h1,
h2,
h3 {
  font-family: "Arial Bold" !important;
  line-height: 150%;
}
.vue-core-video-player-layers {
  z-index: 0 !important;
}
.main-content {
  margin-bottom: 150px !important;
  margin-top: 20px !important;
  min-height: calc(100vh - 500px);
}
.v-btn__content {
  justify-content: center !important;
}
.router-link {
  text-decoration: none !important;
}
.disabled-link {
  color: rgba(0,0,0,.38) !important;
}
@media screen and (max-width: 800px) {
  .main-content {
    margin-bottom: 150px !important;
    min-height: calc(100vh - 650px);
  }
  h1 {
    font-size: 28px;
  }
}
@media screen and (max-width: 960px) {
  .main-content {
    margin-bottom: 150px !important;
    min-height: calc(100vh - 400px);
  }
}
@media screen and (max-width: 600px) {
  .main-content {
    margin-bottom: 200px !important;
  }
}
@media screen and (max-width: 540px) {
  .main-content {
    margin-bottom: 150px !important;
  }
  h1 {
    font-size: 20px;
  }
}
</style>
<style lang="scss">
  .vue-notification {
    background-color:#fa0 !important;
    padding: 5px;
    margin: 10px 0 0 0 ;
    font-size: 16px;
    border-left:none;
    text-align: center;
    border-radius: 5px;
    font-family: "Archivo Narrow" !important;
    font-weight: 700;
    &.error {
      background: #E54D42;
    }
  }
</style>

<script>
import SystemBar from './components/SystemBar.vue'
import Footer from './components/Footer.vue'
import MainMenu from '@/components/MainMenu.vue'
import WhitefoneLayout from './layouts/WhitefoneLayout.vue'
import DefaultLayout from './layouts/DefaultLayout.vue'
import { mapState } from 'vuex'
export default {
  name: 'App',

  components: {
    SystemBar,
    Footer,
    MainMenu,
    WhitefoneLayout,
    DefaultLayout
  },
  data () {
    return {
      maimMenuShowInRouteNames: [
        'home',
        'add-course',
        'add-course-payment',
        'course-card',
        'course-offline',
        'course-online',
        'personal-data',
        'payment-details'
      ]
    }
  },
  computed: {
    ...mapState(['viewportWidth']),
    layout () {
      return `${this.$route.meta?.layout || 'default'}-layout`
    }
  },
  methods: {
    onResize () {
      this.$store.commit('CHANGE_VIEWPORT_WIDTH')
    }
  },
  mounted () {
    this.onResize()
    this.$store.dispatch('shop/GET_SHOP_CATEGORIES')
    window.addEventListener('resize', this.onResize, { passive: true })
    // this.$store.dispatch('auth/GET_TOKEN')
    // this.$store.dispatch('auth/GET_USER')
  },
  beforeCreate () {
    // this.$store.dispatch('auth/GET_TOKEN')
    // this.$store.dispatch('auth/GET_USER')
    this.$store.dispatch('auth/IS_SIGNED')
  },
  destroyed () {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize, { passive: true })
    }
  }
}
</script>
