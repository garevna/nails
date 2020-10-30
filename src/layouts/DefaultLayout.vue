<template>
  <v-main>
    <router-view />
  </v-main>
</template>
<script>
export default {
  beforeCreate () {
    this.$vuetify.theme.dark = true
  },
  beforeDestroy () {
    this.$vuetify.theme.dark = false
  }
}
</script>
