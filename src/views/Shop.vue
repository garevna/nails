<template>
  <v-card flat>
    <v-card flat v-if="contentShow" class="d-flex justify-center flex-wrap">
      <ShopCard
        v-for="commodity in commodities"
        :key="commodity.id"
        :commodity="commodity"
        @click="goToItem"
        width="250"
        height="350"
      />
    </v-card>

    <v-card flat v-if="contentEmpty">
      <v-card
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

    <v-card flat v-if="isShopLoading" class="d-flex justify-center flex-wrap">
      <v-card class="pa-0 pt-0 ma-4 skeleton" v-for="i in 12" :key="i" color="lgrey" width="250" height="350">
        <v-skeleton-loader type="image, list-item-three-line" animation></v-skeleton-loader>
      </v-card>
    </v-card>

    <v-card flat v-if="pages > 1 && !isShopLoading" class="mt-10">
      <v-pagination
        v-model="page"
        :length="pages"
        :total-visible="8"
        color="orange"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
      ></v-pagination>
    </v-card>

    <v-card flat v-if="showBtnMore && !isShopLoading" class="mt-10">
      <v-card-actions class="justify-center">
        <v-btn color="buttons" rounded large dark min-width="160" class="yellow-button" @click="otherCommodities"
          >other goods</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-card>
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
      return this.commodities.length && !this.isShopLoading;
    },
    contentEmpty() {
      return !this.contentShow && !this.isShopLoading;
    },
    showBtnMore() {
      return this.$route.name === 'shop-root';
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
    search() {
      this.page = 1;
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
    async otherCommodities() {
      const options = {
        duration: 600,
        offset: 100,
        easing: 'easeInOutCubic',
      };
      await this.getCommodities();
      this.$vuetify.goTo('#top-page', options);
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

<style>
.skeleton .v-skeleton-loader__image {
  height: 250px !important;
}
</style>
