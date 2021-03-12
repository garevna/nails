<template>
  <v-app-bar app dark elevate-on-scroll class="homefone pt-6">
    <v-card class="primary app-bar-header d-flex px-4 py-2" style="position: relative" tile width="100%" height="68">
      <Logo @click="goTo('home')" class="logo" />
      <v-spacer></v-spacer>
      <v-card-actions v-if="!widthLimit" class="menu-app-bar-btn button pa-0">
        <v-btn class="black--text" @click="goTo('home')" text>HOME</v-btn>
        <v-btn class="black--text" @click="goTo('shop-root')" text>SHOP</v-btn>
        <v-btn class="black--text" @click="goTo('courses')" text>COURSES</v-btn>
      </v-card-actions>

      <MenuSystemBar v-if="!widthLimit" />
      <v-btn text v-if="widthLimit" @click="panel = !panel" class="my-auto">
        <span :class="burgerMenuClassFirst"></span>
        <span :class="burgerMenuClassSecond"></span>
      </v-btn>
      <BurgerMenu v-if="widthLimit" :panel.sync="panel" />
    </v-card>
  </v-app-bar>
</template>

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
    panel: false,
  }),
  computed: {
    ...mapState(['viewportWidth']),
    // ...mapState('shop', ['categories']),
    burgerMenuClassFirst() {
      return !this.panel ? 'burger-menu--first' : 'burger-menu-active--first';
    },
    burgerMenuClassSecond() {
      return !this.panel ? 'burger-menu--second' : 'burger-menu-active--second';
    },
    widthLimit() {
      return this.viewportWidth < 1000;
    },
  },
  methods: {
    goTo(name) {
      this.panel = false;
      if (this.$route.name !== name) {
        this.$router.push({ name });
      }
    },
  },
  mounted() {},
};
</script>
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
  font-size: 22px;
  font-weight: 700;
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
