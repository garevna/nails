<template>
  <!-- Viewport width wider or equal lg -->
  <!-- <v-app-bar
            app
            fixed
            height="80"
            flat
            class="homefone app-bar d-none d-lg-block"
    >
        <v-row align="center" justify="center">
          <span height="45" width="150" class="ml-10">
            <v-img src="@/assets/logo.svg" contain width="150" height="45"></v-img>
          </span>
          <v-spacer></v-spacer>
      <v-btn-toggle
            group
            flat
            class="mr-10 d-none d-lg-flex"
            color="transparent"
            v-model="toggle"
      >
        <v-btn text
               v-for="(page, index) in pages"
               :key="index"
               :class="getClassName(page)"
               @click="$emit('update:selected', index)">
          <ContactUs v-if="page === 'Contact Us'" style="width: 50px; height:50px;" />
              {{ page }}
        </v-btn>
      </v-btn-toggle>
    </v-row>
  </v-app-bar>-->

  <v-app-bar app color="primary" outlined dark style="top:20px;-webkit-box-shadow: 0px 15px 8px 0px rgba(0,0,0,0.68);
-moz-box-shadow: 0px 15px 8px 0px rgba(0,0,0,0.68);
box-shadow: 0px 15px 8px 0px rgba(0,0,0,0.68);" class="pb-15">
    <div class="d-flex align-center">
      <h1>
        <span style="color: #000">NAILS</span>AUSTRALIA
      </h1>
    </div>
    <v-spacer></v-spacer>
    <div class="primary app-bar d-none d-md-block">
      <v-btn @click="goHome" text>HOME</v-btn>
      <v-btn @click="goToShop" text>SHOP</v-btn>
      <v-btn @click="goToCourses" text>COURSES</v-btn>
    </div>
    <MenuSystemBar class=" d-none d-md-flex"/>

    <!-- Viewport width less then lg -->
    <v-expansion-panels
      tile
      flat
      v-model="panel"
      class="app-bar d-md-none"
      width="100%"
      style="position: fixed; left: 0; margin-top: -8px; z-index: 10;"
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
</template>

<style scoped>
.burger-menu {
  position: fixed;
  right: 24px;
  top: 8px;
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
    }
  },
  methods: {
    goHome () {
      this.panel = []
      if (this.$route.name !== 'home') this.$router.push({ name: 'home' })
    },
    goToShop () {
      this.panel = []
      let selectedSection
      if (this.categories && this.categories[0] && this.categories[0][0] && this.categories[0][0]._id) {
        selectedSection = this.categories[0][0]
      }
      if (this.$route.name !== 'shop') this.$router.push({ name: 'shop', params: { categoryId: selectedSection._id } })
    },
    goToCourses () {
      this.panel = []
      if (this.$route.name !== 'courses') this.$router.push({ name: 'courses' })
    }
  },
  mounted () {
    if (!this.categories) {
      this.$store.dispatch('shop/GET_SHOP_CATEGORIES')
    }
  }
}
</script>
