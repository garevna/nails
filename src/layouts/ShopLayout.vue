<template>
  <!-- :class="{ 'pt-10': !isShopPageOpened }" min-height="70vh" -->
  <v-container fluid class="mt-12">
    <v-row v-if="isShopPageOpened" >
      <v-col cols="12"  >
        <Search />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <CategoriesSwitcher />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="4" lg="3" v-if="!mobileMenu">
        <LeftSideMenu v-if="categories" />
        <v-card v-else flat class="transparent">
          <v-skeleton-loader v-for="i in 7" :key="i" height="30px" animation type="image"></v-skeleton-loader>
        </v-card>
      </v-col>

      <v-col cols="12" md="7" lg="9">
        <router-view />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapState } from 'vuex';
import LeftSideMenu from '@/components/Shop/LeftSideMenu.vue';
import CategoriesSwitcher from '@/components/Shop/CategoriesSwitcher.vue';
import Search from '@/components/Shop/Search.vue';

export default {
  name: 'ShopLayout',
  components: { LeftSideMenu, CategoriesSwitcher, Search },
  computed: {
    ...mapState(['viewportWidth']),
    ...mapState('shop', ['activeCategory', 'categories']),
    mobileMenu() {
      return this.viewportWidth < 960;
    },
    isShopPageOpened() {
      return this.$route.name === 'shop';
    },
  },
  methods: {},
  async mounted() {
    this.$store.dispatch('shop/GET_SHOP_CATEGORIES');
  },
};
</script>

<style scoped lang="scss">
.panel-content {
  .v-expansion-panel-content__wrap {
    padding-top: 5px !important;
  }
}
// .v-expansion-panel-header {
//   padding-bottom: 0px !important;
// }
</style>
