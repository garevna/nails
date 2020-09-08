<template>
  <div class="header-container" :style="{ backgroundColor: backgroundColor }">
    <v-app-bar app color="#FFC44A" outlined dark class="app-bar-header">
      <div class="d-flex align-center">
         <h1><span  @click="goHome" class="logo">NAILS</span>AUSTRALIA</h1>
      </div>
      <v-spacer></v-spacer>
      <div class="primary app-bar d-none d-md-block menu-app-bar-btn">
        <v-btn @click="goHome" text>HOME</v-btn>
        <v-btn @click="goToShop" text>SHOP</v-btn>
        <v-btn @click="goToCourses" text>COURSES</v-btn>
      </div>
      <MenuSystemBar class=" d-none d-md-flex" />

      <!-- Viewport width less then lg -->
      <v-expansion-panels
        tile
        flat
        v-model="panel"
        class="app-bar d-md-none"
        style="position: fixed; left: 0; margin-top: -8px; z-index: 0;"
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
            style="margin-top: 128px; padding: 64px 16px 16px!important"
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
            </v-list>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-app-bar>
  </div>
</template>

<style scoped lang="scss">
.logo {
  color:black !important;
  cursor: pointer;
}
.app-bar-header {
  top: 20px !important;
  -webkit-box-shadow: 0px 15px 8px 0px rgba(0, 0, 0, 0.68) !important;
  -moz-box-shadow: 0px 15px 8px 0px rgba(0, 0, 0, 0.68) !important;
  box-shadow: 0px 15px 8px 0px rgba(0, 0, 0, 0.68) !important;
  background-color: #ffc44a !important;
}
.menu-app-bar-btn button {
  color: #000;
  font-size: 22px;
  font-weight: 700;
}
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

<script>
import MenuSystemBar from '@/components/MenuSystemBar.vue'
import { mapState } from 'vuex'

export default {
  name: 'SystemBar',
  components: {
    MenuSystemBar
  },
  data: () => ({
    toggle: 0,
    panel: undefined
  }),
  computed: {
    ...mapState('shop', ['categories']),
    burgerMenuClassFirst () {
      return this.panel === 0 ? 'burger-menu-active--first' : 'burger-menu--first'
    },
    burgerMenuClassSecond () {
      return this.panel === 0 ? 'burger-menu-active--second' : 'burger-menu--second'
    },
    backgroundColor () {
      return this.$vuetify.theme.themes.light.homefone
    }
  },
  methods: {
    goHome () {
      this.panel = []
      if (this.$route.name !== 'home') this.$router.push({ name: 'home' })
    },
    goToShop () {
      this.panel = []
      if (this.$route.name !== 'shop') this.$router.push({ name: 'shop' })
    },
    goToCourses () {
      this.panel = []
      if (this.$route.name !== 'courses') this.$router.push({ name: 'courses' })
    }
  },
  mounted () {

  }
}
</script>
