<template>
  <v-container dark class="homefone py-12" fluid>
    <MainMenu v-if="showMainMenu"/>
    <Breadcrumbs />
    <router-view />
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

import MainMenu from '@/components/MainMenu.vue';
import Breadcrumbs from '@/components/Breadcrumbs.vue';

export default {
  name: 'DefaultLayout',
  components: {
    MainMenu,
    Breadcrumbs,
  },
  data() {
    return {
      maimMenuShowInRouteNames: [
        'home',
        'add-course',
        'course-card',
        'course-offline',
        'course-online',
        'by-course',
        'by-offline',
      ],
    };
  },
  computed: {
    ...mapState(['viewportWidth']),
    showMainMenu(){
      return this.maimMenuShowInRouteNames.includes(this.$route.name) && this.widthLimit
    },
    widthLimit() {
      return this.viewportWidth > 1000
    }
  },
  mounted() {
    this.$vuetify.theme.dark = true;
  },
  beforeDestroy() {
    this.$vuetify.theme.dark = false;
  },
};
</script>
