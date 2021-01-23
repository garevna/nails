<template>
  <v-main>
    <Breadcrumbs />
    <router-view />
  </v-main>
</template>

<script>
import Breadcrumbs from '@/components/Breadcrumbs.vue'

export default {
  components: {
    Breadcrumbs
  },
  beforeCreate () {
    this.$vuetify.theme.dark = true
  },
  beforeDestroy () {
    this.$vuetify.theme.dark = false
  }
}
</script>
