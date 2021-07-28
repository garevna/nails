<template>
  <v-row>
    <v-col cols="12" md="6" lg="5" v-if="commodity && !isCommodityLoading">
      <v-card flat class="px-5">
        <v-img :src="currentLink" :lazy-src="noImage" height="400px" contain></v-img>
        <v-slide-group v-model="activeCard" center-active mandatory show-arrows>
          <v-slide-item v-slot:default="{ active, toggle }" v-for="img in previewImgs" :key="img._id">
            <v-img
              @click="toggle"
              :src="img.link"
              :lazy-src="noImage"
              width="60"
              height="60"
              contain
              active
              alt="Commodity image"
              :class="[active ? 'card-active' : 'card-disabled', 'mx-2']"
            ></v-img>
          </v-slide-item>
        </v-slide-group>
      </v-card>
    </v-col>

    <v-col cols="12" md="6" offset-lg="1" lg="5" v-if="commodity && !isCommodityLoading">
      <h2 class="dgrey--text text-center text-md-start">{{ commodity.name }}</h2>
      <h4 class="shopfont--text text-center text-md-start">{{ commodity.brand }}</h4>
      <div class="caption mt-12">
        <h2 class="speciﬁcations">{{ commodity.speciﬁcations }}</h2>
      </div>
      <v-card flat class="text-center text-md-end">
        <h3 class="darkGrey--text my-6 text-end">{{ commodity.price }} AUD</h3>
        <h4 v-if="!commodity.amount" class="mb-4">not available</h4>
        <v-card-actions flat class="flex-column align-center align-md-end pa-0">
          <v-btn
            :disabled="!commodity.amount"
            small
            width="200"
            class="dgrey--text mb-4"
            color="orange"
            @click="addToCart"
            >Add to card</v-btn
          >
          <v-btn :disabled="!commodity.amount" small width="200" class="ml-0 white--text" color="dgrey" @click="buyNow"
            >Buy it now</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-col>
    <AlsoViewed
      v-if="commodity && !isCommodityLoading"
      :commodities="alsoViewedCommodities"
      :loading="isCommodityLoading"
      @click="goToItem"
    />

    <ShopItemSkeleton v-if="isCommodityLoading" />

    <h3 v-if="!isCommodityLoading && !commodity" class="mt-16 mx-auto">No such item</h3>
  </v-row>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import AlsoViewed from '@/components/Shop/AlsoViewed.vue';
import ShopItemSkeleton from '@/components/Shop/ShopItemSkeleton.vue';

export default {
  name: 'ShopItem',
  components: { AlsoViewed, ShopItemSkeleton },
  data() {
    return {
      activeCard: 0,
      noImage: require('@/assets/no-image.png'),
    };
  },
  computed: {
    ...mapState(['viewportWidth']),
    ...mapState('auth', ['isLogged']),
    ...mapState('shop', ['categories', 'commodities', 'commodity', 'isCommodityLoading']),
    ...mapGetters('shop', ['fullListOfCategories', 'pages']),
    activeCategory() {
      return this.fullListOfCategories.find(category => category.slug === this.$route.params.categoryName) ?? null;
    },
    alsoViewedCommodities() {
      return this.commodities.filter(commodity => commodity._id !== this.$route.params.commodityId);
    },
    previewImgs() {
      return this.commodity?.images ?? [];
    },
    currentLink() {
      return this.commodity?.images[this.activeCard]?.link ?? this.noImage;
    },
  },
  watch: {
    commodityId(newVal) {
      this.$store.dispatch('shop/GET_COMMODITY', {
        commodityId: newVal,
      });
    },
    activeCategory() {
      this.getCommodities();
    },
    $route() {
      this.getCommodity();
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
    addToCart() {
      this.$store.dispatch('productCart/ADD_TO_CART', this.$route.params.commodityId);
    },
    buyNow() {
      this.addToCart();
      if (!this.isLogged) {
        this.$router.push({ name: 'sign-in' });
        return;
      }
      this.$router.push({ name: 'shop-payment' });
    },
    getCommodities() {
      if (!this.activeCategory) return;
      this.$store.dispatch('shop/GET_COMMODITIES', {
        categoryId: this.activeCategory?._id,
        isSubcategory: !Array.isArray(this.activeCategory.subcategories),
      });
    },
    async getCommodity() {
      await this.$store.dispatch('shop/GET_COMMODITY', {
        commodityId: this.$route.params.commodityId,
      });
    },
  },
  async mounted() {
    await this.getCommodity();
  },
};
</script>

<style>
.card-active {
  opacity: 1 !important;
}
.card-disabled {
  cursor: pointer;
  opacity: 0.4 !important;
}
.speciﬁcations {
  white-space: pre-wrap;
}
</style>
