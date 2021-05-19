<template>
  <v-app dark>
    <SystemBar />
    <v-main class="homefone">
      <component :is="layout">
        <!-- <router-view /> -->
      </component>
    </v-main>
    <Footer v-if="showFooter" />
    <UploadFiles v-if="uploadDialog" />
    <error-message />
    <simple-message />
  </v-app>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'App',

  components: {
    SystemBar: () => import('@/components/SystemBar.vue'),
    Footer: () => import('@/components/Footer.vue'),
    ShopLayout: () => import('@/layouts/ShopLayout.vue'),
    DefaultLayout: () => import('@/layouts/DefaultLayout.vue'),
    WhitefoneLayout: () => import('@/layouts/WhitefoneLayout.vue'),
    UploadFiles: () => import('@/components/UploadFiles.vue'),
  },

  computed: {
    // ...mapState(['viewportWidth']),
    ...mapState('shop', ['activeCategory']),
    ...mapState('courses', ['uploadDialog']),
    showFooter() {
      return this.$route.name !== 'products-cart';
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
    // this.$store.dispatch('instagram/GET_INSTAGRAM');
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
  font-family: 'robotoblack' !important;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'robotobold' !important;
  line-height: 150%;
}
.header-btn {
  font-family: 'robotobold' !important;
  font-size: 16px !important;
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
.yellow-button {
  color: #000 !important;
  font-family: 'robotobold' !important;
  font-size: 16px !important;
}
.hide .v-expansion-panel-header__icon {
  display: none !important;
}
</style>
