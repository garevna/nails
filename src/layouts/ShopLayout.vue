<template>
  <v-container fluid class="mt-12" id="top-page">
    <v-row v-if="isShopPageOpened">
      <v-col cols="12">
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
        <AccordionMenu v-if="isShowLeftSideMenu" :categories="categories" :fullListOfCategories="fullListOfCategories"/>
        <v-card v-else flat class="transparent">
          <v-skeleton-loader v-for="i in 7" :key="i" height="50px" animation type="image"></v-skeleton-loader>
        </v-card>
      </v-col>

      <v-col cols="12" md="7" lg="9">
        <router-view />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import AccordionMenu from '@/components/Shop/AccordionMenu.vue';
import CategoriesSwitcher from '@/components/Shop/CategoriesSwitcher.vue';
import Search from '@/components/Shop/Search.vue';

export default {
  name: 'ShopLayout',
  components: { AccordionMenu, CategoriesSwitcher, Search },
  computed: {
    ...mapState(['viewportWidth']),
    ...mapState('shop', ['categories']),
    ...mapGetters('shop', ['fullListOfCategories']),
    mobileMenu() {
      return this.viewportWidth < 960;
    },
    isShopPageOpened() {
      return ['shop', 'shop-root'].includes(this.$route.name);
    },
    isShowLeftSideMenu() {
      return this.categories?.length;
    },
  },
  methods: {},
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
