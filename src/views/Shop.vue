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

    <EmptyContent v-if="contentEmpty" />

    <ShopCardSkeleton v-if="isShopLoading" />

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
import ShopCardSkeleton from '@/components/Shop/ShopCardSkeleton.vue';
import EmptyContent from '@/components/Shop/EmptyContent.vue';

export default {
  name: 'Shop',
  components: {
    ShopCard,
    ShopCardSkeleton,
    EmptyContent,
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
  mounted() {
    this.getCommodities();
  },
};
</script>

