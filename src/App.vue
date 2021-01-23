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
    </div>

    <!-- <notifications group="foo" position="top center" /> -->
    <v-snackbar v-model="snackbar" :timeout="timeout" :color="color" top>
      {{ text }}

      <template v-slot:action="{ attrs }" text>
        <v-btn text v-bind="attrs" @click="snackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn></template
      >
    </v-snackbar>
  </v-app>
</template>

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
.vue-core-video-player-layers {
  z-index: 0 !important;
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
.disabled-link {
  color: rgba(0, 0, 0, 0.38) !important;
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

<script>
import { mapState } from 'vuex';

import SystemBar from './components/SystemBar.vue';
import Footer from './components/Footer.vue';
import MainMenu from '@/components/MainMenu.vue';
import ShopLayout from './layouts/ShopLayout.vue';
import DefaultLayout from './layouts/DefaultLayout.vue';

export default {
  name: 'App',

  components: {
    SystemBar,
    Footer,
    MainMenu,
    DefaultLayout,
    ShopLayout,
  },
  data() {
    return {
      snackbar: false,
      text: '',
      timeout: 8000,
      color: 'green',
      maimMenuShowInRouteNames: [
        'home',
        'add-course',
        'add-course-payment',
        'course-card',
        'course-offline',
        'course-online',
        'personal-data',
        'payment-details',
      ],
    };
  },
  computed: {
    ...mapState(['viewportWidth']),
    ...mapState('auth', ['authError']),
    ...mapState('userCourses', ['userCoursesError']),
    ...mapState('shop', ['activeCategory']),
    isShopOpened() {
      return this.$route.name === 'shop' || this.$route.name === 'shop-item';
    },
    layout() {
      if (this.isShopOpened) {
        return 'shop-layout';
      }
      return 'default-layout';
    },
  },
  watch: {
    authError(val) {
      if (val) {
        // this.$notify({
        //   group: 'foo',
        //   type: 'error',
        //   text: val
        // })
        this.snackbar = true;
        this.text = val;
        this.color = 'red';
      }
    },
    userCoursesError(val) {
      if (val) {
        // this.$notify({
        //   group: 'foo',
        //   type: 'error',
        //   text: val
        // })
        this.snackbar = true;
        this.text = val;
        this.color = 'red';
      }
    },
  },
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
    this.$store.dispatch('shop/GET_SHOP_CATEGORIES');
    window.addEventListener('resize', this.onResize, { passive: true });
  },
  async beforeCreate() {
    await this.$store.dispatch('auth/IS_SIGNED');
    await this.$store.dispatch('shop/GET_SHOP_CATEGORIES');
    // await this.shopInit();
  },

  destroyed() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize, { passive: true });
    }
  },
};
</script>
