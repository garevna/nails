<template>
  <v-card flat class="pa-2  my-16" :class="{ 'pt-10': !isShopPageOpened }" min-height="70vh">
    <v-row class="ma-0 pa-0">
      <v-col v-if="isShopPageOpened" cols="12">
        <Search />
      </v-col>
      <v-col cols="12">
        <CategoriesSwitcher />
      </v-col>
      <v-col cols="4" lg="2" v-if="!mobileMenu">
        <LeftSideMenu v-if="categories" />
        <v-card v-else flat>
          <v-row>
            <v-col v-for="i in 7" :key="i" cols="12">
              <v-skeleton-loader height="30px" animation type="image"></v-skeleton-loader>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" md="8" lg="10" class="px-5 pt-6 pb-0">
        <router-view />
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import { mapState } from 'vuex';
import LeftSideMenu from '@/components/Shop/LeftSideMenu.vue';
import CategoriesSwitcher from '@/components/Shop/CategoriesSwitcher.vue';
import Search from '@/components/Shop/Search.vue';

export default {
  name: 'Shop',
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
