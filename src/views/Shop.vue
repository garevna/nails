<template>
  <v-container fluid>
    <v-row v-if="contentShow">
      <v-col cols="12">
        <div class="d-flex justify-center flex-wrap">
          <ShopCard v-for="commodity in commodities" :key="commodity.id" :commodity="commodity" @click="goToItem" />
        </div>
      </v-col>
    </v-row>

    <v-row v-if="contentEmpty">
      <v-col>
        <v-card
          flat
          height="100%"
          class="justify-center align-items-center flex-column ma-0 pa-0 d-flex"
          width="100%"
          justify="center"
        >
          <v-card-text class="d-flex flex-column justify-center align-center">
            <p class="dgrey--text text-center text-h4 font-weight-medium">
              Unfortunately, there are no products <br />
            </p>
            <p class="dgrey--text text-center text-h4 font-weight-medium">suitable for your request...</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-if="isShopLoading">
      <v-col cols="12" sm="6" md="4" lg="3" class="px-5 pb-2" v-for="i in 12" :key="i">
        <v-card class="pa-0 pt-0 mt-0" color="lgrey">
          <v-skeleton-loader type="image, list-item-three-line" animation></v-skeleton-loader>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-if="totalPages > 1 && !isShopLoading">
      <v-col cols="12" class="mt-10">
        <v-pagination
          v-model="pagination.page"
          :length="pagination.total"
          @input="setPage"
          color="orange"
          prev-icon="mdi-menu-left"
          next-icon="mdi-menu-right"
          class="pagination-buttons"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

import ShopCard from '@/components/Shop/ShopCard.vue';

export default {
  name: 'Shop',
  components: {
    ShopCard,
  },
  data() {
    return {
      categoryName: this.$route.params.categoryName,
      coverImageSrc: require('@/assets/noImage.jpg'),
      noImage: require('@/assets/no-image.png'),
    };
  },
  computed: {
    ...mapState(['viewportWidth']),
    ...mapState('shop', [
      'categories',
      'isShopLoading',
      'commodities',
      'totalCommodities',
      'activeCategory',
      'totalPages',
    ]),
    pagination() {
      const page = +this.$route.query.page;
      return {
        page: !isNaN(page) ? page : 1,
        total: Math.ceil(this.totalCommodities / 12),
        skip: !isNaN(page) ? page * 12 - 12 : 0,
      };
    },
    mobileMenu() {
      return this.viewportWidth < 960;
    },
    selectedCategoryName() {
      return this.$store.getters.selectedCategoryName;
    },
    contentShow() {
      return this.commodities.length;
    },
    contentEmpty() {
      return !this.contentShow && !this.isShopLoading;
    },
  },
  watch: {
    $route(to, from) {
      if (from.name === 'shop' && to.name === 'shop' && to.params.categoryName !== from.params.categoryName) {
        this.$store.dispatch('shop/SET_NEW_CATEGORY', { category: to.params.categoryName });
      }
    },
  },
  methods: {
    setPage(page) {
      if (page !== this.$route.query.page) {
        this.$router.push({
          name: 'shop',
          params: { categoryId: this.categoryId },
          query: { page },
        });
        this.$store.dispatch('shop/GET_MORE_COMMODITIES', { skip: this.pagination.skip });
        this.pagination.page = page;
        this.pagination.skip = page * 12 - 12;
      }
    },
    goToItem(id) {
      this.$router.push({
        name: 'shop-item',
        params: {
          commodityId: id,
        },
      });
    },
  },
  beforeDestroy() {
    // this.$store.commit('shop/CLEAR_COMMODITIES');
  },
  async mounted() {
    await this.$store.dispatch('shop/INIT_SHOP', {
      categoryName: this.categoryName,
      skip: this.pagination.skip,
    });
    if (!this.categoryName) {
      await this.$router.replace({
        name: 'shop',
        params: { categoryName: this.activeCategory.slug },
      });
    }
  },
};
</script>

<style lang="scss">
@import '@/css/variables.scss';
.pagination-buttons {
  button {
    outline: none !important;
  }
}
</style>
