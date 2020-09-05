<template>
  <v-app dark>
    <v-container fluid class="mx-auto homefone">
      <div class="header-container" :style="{backgroundColor:backgroundColor}">
        <SystemBar />
      </div>
      <MainMenu v-if="maimMenuShowInRouteNames.includes(this.$route.name) && viewportWidth > 900"/>
      <v-main class="main-content">
        <router-view></router-view>
      </v-main>
      <Footer />
    </v-container>
  </v-app>
</template>

<style>

html, body,
.v-application {
  font-family: 'Archivo Narrow' !important;
}
.v-application--wrap {
  background: #000!important;
}
h1, h2, h3 {
  font-family: 'Archivo Black' !important;
  line-height: 150%;
}

.main-content {
  margin-bottom: 400px!important;
}
.header-container  {
  position:fixed;
  height: 50px;
  width: 100%;
  top: 0;
  left: 0;
  z-index:20;
}

@media screen and (max-width: 800px) {
  .main-content {
    margin-bottom: 580px!important;
  }
  h1 {
    font-size: 28px;
  }
}
@media screen and (max-width: 960px) {
  .main-content {
    margin-bottom: 470px!important;
  }
}
@media screen and (max-width: 600px) {
  .main-content {
    margin-bottom: 780px!important;
  }
}
@media screen and (max-width: 540px) {
  .main-content {
    margin-bottom: 840px!important;
  }
  h1 {
    font-size: 20px;
  }
}
</style>

<script>
import SystemBar from './components/SystemBar.vue'
import Footer from './components/Footer.vue'
import MainMenu from '@/components/MainMenu.vue'

import { mapState } from 'vuex'

export default {
  name: 'App',

  components: {
    SystemBar,
    Footer,
    MainMenu
  },

  data: () => ({
    maimMenuShowInRouteNames: ['home', 'add-course', 'add-course-payment']
  }),
  computed: {
    ...mapState(['viewportWidth']),
    backgroundColor () {
      return this.$vuetify.theme.themes.light.homefone
    }
  },
  methods: {
    onResize () {
      this.$store.commit('CHANGE_VIEWPORT_WIDTH')
    }
  },
  mounted () {
    this.onResize()
    window.addEventListener('resize', this.onResize, { passive: true })
  },
  beforeDestroy () {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize, { passive: true })
    }
  }
}
</script>
