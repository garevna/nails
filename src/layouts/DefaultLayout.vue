<template>
  <v-container class="homefone" fluid>
    <Breadcrumbs />
    <router-view />
  </v-container>
</template>

<script>
import Breadcrumbs from '@/components/Breadcrumbs.vue';

export default {
  components: {
    Breadcrumbs,
  },
  beforeCreate() {
    this.$vuetify.theme.dark = true;
  },
  beforeDestroy() {
    this.$vuetify.theme.dark = false;
  },
};
</script>
