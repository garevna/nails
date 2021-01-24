<template>
  <v-expansion-panels
    tile
    flat
    v-model="showPanel"
    class="app-bar d-lg-none"
    style="position: fixed; left: 0; margin-top: -8px; z-index: 0"
  >
    <v-expansion-panel style="background: transparent">
      <v-expansion-panel-header expand-icon="none" hide-actions height="80">
        <v-btn text class="burger-menu" height="48" width="48">
          <span :class="burgerMenuClassFirst"></span>
          <span :class="burgerMenuClassSecond"></span>
        </v-btn>
      </v-expansion-panel-header>
      <v-expansion-panel-content
        class="main-menu-content"
        style="margin-top: 128px; padding: 64px 16px 16px !important"
      >
        <v-list flat class="main-menu-content text-center">
          <!-- <v-list-item
                    v-for="(page, index) in pages"
                    :key="index"
                    @click="$emit('update:selected', index); panel = []"
                    style="background: #CACACA"
            >-->
          <v-list-item class="main-menu-content" @click="goHome">
            <v-list-item-title class="main-menu-content main-menu-items">Home</v-list-item-title>
          </v-list-item>
          <v-list-item class="main-menu-content" @click="goToShop">
            <v-list-item-title class="main-menu-content main-menu-items">Shop</v-list-item-title>
          </v-list-item>
          <v-list-item class="main-menu-content" @click="goToCourses">
            <v-list-item-title class="main-menu-content main-menu-items">Courses</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="!isLogged" @click="goToLogin('sign-in')">
            <v-list-item-title class="main-menu-content main-menu-items">Sign in</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="!isLogged" @click="goToLogin('sign-up')">
            <v-list-item-title class="main-menu-content main-menu-items">Sign up</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="isLogged" class="d-flex justify-center" @click="goToCabinet">
            <v-icon color="secondaryGray">mdi-account</v-icon>
          </v-list-item>
          <v-list-item class="d-flex justify-center">
            <ProductsCart />
          </v-list-item>
        </v-list>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import { mapState } from 'vuex';

import ProductsCart from '@/components/Shop/ProductsCart.vue';

export default {
  props: ['panel'],
  components: {
    ProductsCart,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState('auth', ['isLogged']),
    burgerMenuClassFirst() {
      return this.panel === 0 ? 'burger-menu-active--first' : 'burger-menu--first';
    },
    burgerMenuClassSecond() {
      return this.panel === 0 ? 'burger-menu-active--second' : 'burger-menu--second';
    },
    showPanel: {
      get: function () {
        return this.panel;
      },
      set: function (val) {
        this.$emit('update:panel', val);
      },
    },
  },
  methods: {
    goHome() {
      this.showPanel = false;
      if (this.$route.name !== 'home') this.$router.push({ name: 'home' });
    },
    goToShop() {
      this.showPanel = false;
      if (this.$route.name !== 'shop') this.$router.push({ name: 'shop' });
    },
    goToCourses() {
      this.showPanel = false;
      if (this.$route.name !== 'courses') {
        this.$router.push({ name: 'courses' });
      }
    },
    goToLogin(name) {
      this.showPanel = false;
      if (this.$route.name !== name) {
        this.$router.push({ name });
      }
    },
    goToCabinet() {
      this.showPanel = false;
      if (this.$route.name !== 'user-cabinet') this.$router.push({ name: 'user-cabinet' });
    },
  },
};
</script>

<style scoped lang="scss">
.burger-menu {
  position: fixed;
  right: 24px;
  top: 8px;
  z-index: 10;
}
.burger-menu--first,
.burger-menu--second,
.burger-menu-active--first,
.burger-menu-active--second {
  position: absolute;
  height: 3px;
  background: #000;
  left: 0;
  transition: all 0.5s;
}
.burger-menu--first {
  width: 32px;
  top: -8px;
}
.burger-menu--second {
  width: 32px;
  top: 2px;
}
.burger-menu-active--first {
  top: 0;
  width: 32px;
  transform: rotate(-45deg);
}
.burger-menu-active--second {
  top: 0;
  width: 32px;
  transform: rotate(45deg);
}
.main-menu-content {
  background: #fafafa !important;
  color: #000;
}
.main-menu-items {
  font-size: 18px;
  line-height: 40px;
}
.v-expansion-panel-header {
  width: 0 !important;
  position: absolute;
  right: 30px;
  top: -15px;
}
.header-container {
  position: fixed;
  height: 50px;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 5;
}
</style>
