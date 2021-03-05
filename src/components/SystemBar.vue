<template>
  <v-app-bar app dark elevate-on-scroll class="homefone pt-6">
    <v-card class="primary app-bar-header d-flex px-4 py-2" style="position: relative" tile width="100%" height="68">
      <Logo :goHome="goHome" class="logo" />
      <v-spacer></v-spacer>
      <v-card-actions v-if="!widthLimit" class="menu-app-bar-btn button pa-0">
        <v-btn class="black--text" @click="goHome" text>HOME</v-btn>
        <v-btn class="black--text" @click="goToShop" text>SHOP</v-btn>
        <v-btn class="black--text" @click="goToCourses" text>COURSES</v-btn>
      </v-card-actions>

      <MenuSystemBar v-if="!widthLimit" />
      <BurgerMenu v-if="widthLimit" :panel.sync="panel" />
    </v-card>
  </v-app-bar>
</template>

<style scoped lang="scss">
.logo {
  width: 300px;
  cursor: pointer;
}
.app-bar-header {
  -webkit-box-shadow: 0px 15px 8px 0px rgba(0, 0, 0, 0.68) !important;
  -moz-box-shadow: 0px 15px 8px 0px rgba(0, 0, 0, 0.68) !important;
  box-shadow: 0px 15px 8px 0px rgba(0, 0, 0, 0.68) !important;
}
.menu-app-bar-btn button {
  // color: #000;
  font-size: 22px;
  font-weight: 700;
}
.header-container {
  position: fixed;
  height: 50px;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 10;
}
@media screen and (max-width: 600px) {
  .logo {
    width: 250px;
  }
}
</style>
<style>
.v-toolbar__content {
  padding: 0 !important;
}
</style>

<script>
import { mapState } from 'vuex';

import MenuSystemBar from '@/components/MenuSystemBar.vue';
import Logo from '@/components/svg/Logo.vue';
import BurgerMenu from '@/components/BurgerMenu.vue';

export default {
  name: 'SystemBar',
  components: {
    MenuSystemBar,
    Logo,
    BurgerMenu,
  },
  data: () => ({
    toggle: 0,
    panel: false,
  }),
  computed: {
    ...mapState(['viewportWidth']),
    // ...mapState('shop', ['categories']),
    burgerMenuClassFirst() {
      return this.panel === 0 ? 'burger-menu-active--first' : 'burger-menu--first';
    },
    burgerMenuClassSecond() {
      return this.panel === 0 ? 'burger-menu-active--second' : 'burger-menu--second';
    },
    widthLimit() {
      return this.viewportWidth < 1000;
    },
  },
  methods: {
    goHome() {
      this.panel = [];
      if (this.$route.name !== 'home') this.$router.push({ name: 'home' });
    },
    goToShop() {
      this.panel = [];
      if (this.$route.name !== 'shop') this.$router.push({ name: 'shop', params: { categoryName: 'nail-tools' } });
    },
    goToCourses() {
      this.panel = [];
      if (this.$route.name !== 'courses') {
        this.$router.push({ name: 'courses' });
      }
    },
  },
  mounted() {},
};
</script>
