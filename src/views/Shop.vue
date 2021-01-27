<template>
  <v-card flat min-height="350" class="pa-0 ma-0" height="100%">
    <v-card v-if="!isShopLoading" class="pa-0 pt-0 mt-0" flat width="100%" height="100%">
      <v-row v-if="commodities.length" class="ma-0 pa-0">
        <v-col v-for="card in commodities" :key="card.id" cols="12" sm="6" md="4" lg="3" class="px-5 pb-2" link>
          <v-card
            width="100%"
            min-height="300"
            rounded="0"
            shaped
            height="100%"
            color="lgrey"
            class="pa-2"
            @click="goToItem(card._id)"
          >
            <v-card flat width="100%">
              <v-img
                :src="(card.previewImage[0] && card.previewImage[0].link) || coverImageSrc"
                width="100%"
                height="270"
                contain
              />
            </v-card>
            <v-card-text class="pa-2 pb-0">
              <span>
                <p class="text-h6 ma-0 pa-0 font-weight-bold dgrey--text text-start">
                  {{ card.name }}
                </p>
                <p class="text-subtitle-1 ma-0 font-weight-medium dgrey--text text-start">
                  {{ card.brand }}
                </p>
              </span>

              <p class="text-end text-subtitle-1 ma-0 pa-0 font-weight-bold dgrey--text">{{ card.price }} AUD</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-card
        v-else
        flat
        height="100%"
        class="justify-center align-items-center flex-column ma-0 pa-0 d-flex"
        width="100%"
        justify="center"
      >
        <v-card-text class="d-flex flex-column justify-center align-center">
          <p class="dgrey--text text-center text-h4 font-weight-medium">Unfortunately, there are no products <br /></p>
          <p class="dgrey--text text-center text-h4 font-weight-medium">suitable for your request...</p>
        </v-card-text>
      </v-card>
    </v-card>
    <v-card v-else width="100%" flat>
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="3" class="px-5 pb-2" v-for="i in 12" :key="i">
          <v-card class="pa-0 pt-0 mt-0" color="lgrey">
            <v-skeleton-loader type="image, list-item-three-line" animation></v-skeleton-loader>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
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
  </v-card>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Shop',
  data() {
    return {
      categoryName: this.$route.params.categoryName,
      coverImageSrc: require('@/assets/noImage.jpg'),
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
    this.$store.commit('shop/CLEAR_COMMODITIES');
  },
  async created() {
    if (!this.categories) await this.$store.dispatch('shop/GET_SHOP_CATEGORIES');
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
