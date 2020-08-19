<template>
  <v-app dark>
    <v-container fluid class="mx-auto homefone">
      <SystemBar />
      <v-main>
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
h1, h2, h3 {
  font-family: 'Archivo Black' !important;
  line-height: 150%;
}

</style>

<script>
import SystemBar from './components/SystemBar.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',

  components: {
    SystemBar,
    Footer
  },

  data: () => ({
    //
  }),
  methods: {

  }
}
</script>
