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

    <v-row v-if="pages > 1 && !isShopLoading">
      <v-col cols="12" class="mt-10">
        <v-pagination
          v-model="page"
          :length="pages"
          :total-visible="8"
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
import { mapState, mapGetters } from 'vuex';
import ShopCard from '@/components/Shop/ShopCard.vue';

export default {
  name: 'Shop',
  components: {
    ShopCard,
  },
  data() {
    return {
      coverImageSrc: require('@/assets/noImage.jpg'),
      noImage: require('@/assets/no-image.png'),
      page: +this.$route.query.page || 1,
    };
  },
  computed: {
    ...mapState('shop', ['isShopLoading', 'categories', 'commodities', 'pageSize', 'total', 'search']),
    ...mapGetters('shop', ['fullListOfCategories', 'pages']),
    activeCategory() {
      return this.fullListOfCategories.find(category => category.slug === this.$route.params.categoryName) ?? null;
    },
    contentShow() {
      return this.commodities.length;
    },
    contentEmpty() {
      return !this.contentShow && !this.isShopLoading;
    },
  },
  watch: {
    activeCategory() {
      this.getCommodities();
    },
    page(newPage, oldPage) {
      if (newPage !== oldPage) {
        this.$router.push({
          name: this.$route.name,
          params: { categoryName: this.$route.params.categoryName },
          query: { page: newPage },
        });
      }
      this.getCommodities();
    },
    search(str) {
      this.page = 1;
      console.log('search', str);
      this.getCommodities();
    },
  },
  methods: {
    categorySlug(id) {
      return this.fullListOfCategories.find(category => category._id === id)?.slug ?? 'missing-category';
    },
    goToItem({ id, categoryId }) {
      this.$router.push({
        name: 'shop-item',
        params: {
          commodityId: id,
          categoryName: this.categorySlug(categoryId),
        },
      });
    },
    async getCommodities() {
      if (!this.search && this.$route.name === 'shop-root') {
        await this.$store.dispatch('shop/RANDOM_COMMODITIES');
      } else {
        if (!this.activeCategory) return;
        await this.$store.dispatch('shop/GET_COMMODITIES', {
          categoryId: this.activeCategory?._id,
          isSubcategory: !Array.isArray(this.activeCategory.subcategories),
          page: this.page,
        });
      }
    },
  },
  async mounted() {
    await this.getCommodities();
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
