<template>
  <v-app-bar
    app
    color="primary"
    dark
  >
    <div class="d-flex align-center">
      <h1><span style="color: #000">NAILS</span>AUSTRALIA</h1>
    </div>

    <v-spacer></v-spacer>

    <v-btn
      @click="goHome"
      text
    >HOME</v-btn>
    <v-btn
      @click="goToShop"
      text
    >SHOP</v-btn>
    <v-btn
      @click="goToCourses"
      text
    >COURSES</v-btn>
  </v-app-bar>
</template>

<styles>

.v-application {
  font-family: 'Archivo Narrow' !important;
}
h1, h2, h3 {
  font-family: 'Archivo Black' !important;
}

</styles>

<script>
export default {
  name: 'SystemBar',

  data: () => ({}),
  methods: {
    goHome () {
      console.log(this.$route.name)
      if (this.$route.name !== 'home') this.$router.push({ name: 'home' })
    },
    goToShop () {
      console.log(this.$route.name)
      if (this.$route.name !== 'shop') this.$router.push({ name: 'shop' })
    },
    goToCourses () {
      console.log(this.$route.name)
      if (this.$route.name !== 'courses') this.$router.push({ name: 'courses' })
    }
  }
}
</script>
