<template>
  <v-app dark>
    <SystemBar/>
    <v-main class="homefone"> 
      <component :is="layout">
        <!-- <router-view /> -->
      </component>
    </v-main>
    <Footer v-if="showFooter"/>
    <UploadFiles v-if="uploadDialog" />
    <error-message />
    <simple-message />
  </v-app>
</template>

<script>
import { mapState } from 'vuex';

import SystemBar from '@/components/SystemBar.vue';
import Footer from '@/components/Footer.vue';
import ShopLayout from '@/layouts/ShopLayout.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import WhitefoneLayout from '@/layouts/WhitefoneLayout.vue';

export default {
  name: 'App',

  components: {
    SystemBar,
    Footer,
    ShopLayout,
    DefaultLayout,
    WhitefoneLayout,
    UploadFiles: () => import('@/components/UploadFiles.vue'),
  },

  computed: {
    // ...mapState(['viewportWidth']),
    ...mapState('shop', ['activeCategory']),
    ...mapState('courses', ['uploadDialog']),
    showFooter() {
      return this.$route.name !== 'products-cart'
    },
    layout() {
      return `${this.$route.meta?.layout || 'default'}-layout`;
    },
  },
  watch: {},
  methods: {
    onResize() {
      this.$store.commit('CHANGE_VIEWPORT_WIDTH');
    },
  },
  mounted() {
    this.onResize();
    window.addEventListener('resize', this.onResize, { passive: true });
    this.$store.dispatch('shop/GET_CATEGORIES');
    this.$store.dispatch('instagram/GET_INSTAGRAM');
    this.$store.dispatch('productCart/INIT_CART');
  },
  async created() {
    await this.$store.dispatch('auth/IS_SIGNED');
  },

  destroyed() {
    window.removeEventListener('resize', this.onResize, { passive: true });
  },
};
</script>

<style>
html,
body,
.v-application {
  font-family: 'Arial' !important;
}
h1,
h2,
h3 {
  font-family: 'Arial Bold' !important;
  line-height: 150%;
}

::-webkit-scrollbar {
  width: 10px; /* ширина для вертикального скролла */
  height: 8px; /* высота для горизонтального скролла */
  background-color: #333333;
}

/* ползунок скроллбара */
::-webkit-scrollbar-thumb {
  background-color: #ffc44a;
  border-radius: 9em;
}

.v-btn__content {
  justify-content: center !important;
}

</style>
