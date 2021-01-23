<template>
  <v-card>
    <Breadcrumbs />
    <router-view />
  </v-card>
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
