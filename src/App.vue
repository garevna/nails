<template>
  <v-app dark>
    <div class="homefone">
      <SystemBar />
      <MainMenu v-if="maimMenuShowInRouteNames.includes(this.$route.name) && viewportWidth > 900" />
      <v-main class="main-content">
        <component :is="layout">
          <!-- <router-view /> -->
        </component>
      </v-main>
      <Footer />
      <UploadFiles v-if="uploadDialog" />
    </div>
    <error-message />
    <simple-message />
  </v-app>
</template>

<script>
import { mapState } from 'vuex';

import SystemBar from './components/SystemBar.vue';
import Footer from './components/Footer.vue';
import MainMenu from '@/components/MainMenu.vue';
import ShopLayout from './layouts/ShopLayout.vue';
import DefaultLayout from './layouts/DefaultLayout.vue';
import WhitefoneLayout from './layouts/WhitefoneLayout.vue';

export default {
  name: 'App',

  components: {
    SystemBar,
    Footer,
    MainMenu,
    ShopLayout,
    DefaultLayout,
    WhitefoneLayout,
    UploadFiles: () => import('@/components/UploadFiles.vue'),
  },
  data() {
    return {
      maimMenuShowInRouteNames: [
        'home',
        'add-course',
        'course-card',
        'course-offline',
        'course-online',
        'personal-data',
        'personal-data-off',
      ],
    };
  },
  computed: {
    ...mapState(['viewportWidth']),
    ...mapState('shop', ['activeCategory']),
    ...mapState('courses', ['uploadDialog']),
    isShopOpened() {
      return this.$route.name === 'shop' || this.$route.name === 'shop-item';
    },
    layout() {
      if (this.isShopOpened) {
        return 'shop-layout';
      }
      return `${this.$route.meta?.layout || 'default'}-layout`;
    },
  },
  watch: {},
  methods: {
    onResize() {
      this.$store.commit('CHANGE_VIEWPORT_WIDTH');
    },
    async shopInit() {
      let categoryName;
      const isShopOpened = this.$route.name === 'shop';
      if (isShopOpened) {
        categoryName = this.$route.params.categoryName;
      }
      await this.$store.dispatch('shop/INIT_SHOP', {
        categoryName,
      });
      if (this.$route.name === 'shop' && !categoryName) {
        console.log(this.activeCategory);
        // await this.$router.push({
        //   name: 'shop',
        //   params: { categoryName: this.activeCategory.slug },
        // });
      }
    },
  },
  mounted() {
    this.onResize();
    // this.$store.dispatch('shop/GET_SHOP_CATEGORIES');
    window.addEventListener('resize', this.onResize, { passive: true });
    this.$store.dispatch('instagram/GET_INSTAGRAM');
  },
  async created() {
    await this.$store.dispatch('auth/IS_SIGNED');
  },

  destroyed() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize, { passive: true });
    }
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
a {
  text-decoration: none;
}
.v-expansion-panel-content__wrap {
  padding-top: 50px !important;
}
.main-content {
  margin-bottom: 150px !important;
  margin-top: 20px !important;
  min-height: calc(100vh - 500px) !important;
}
.v-btn__content {
  justify-content: center !important;
}
.router-link {
  text-decoration: none !important;
}
@media screen and (max-width: 800px) {
  .main-content {
    margin-bottom: 150px !important;
    min-height: calc(100vh - 650px);
  }
  h1 {
    font-size: 28px;
  }
}
@media screen and (max-width: 960px) {
  .main-content {
    margin-bottom: 150px !important;
    min-height: calc(100vh - 400px);
  }
}
@media screen and (max-width: 600px) {
  .main-content {
    margin-bottom: 200px !important;
  }
}
@media screen and (max-width: 540px) {
  .main-content {
    margin-bottom: 150px !important;
  }
  h1 {
    font-size: 20px;
  }
}
</style>
