<template>
  <v-row v-if="commodity && !isCommodityLoading">
    <v-col cols="12" sm="6" lg="5">
      <!-- <v-row class="image-row d-flex justify-center"> -->
      <v-card flat class="px-5">
        <v-img :src="currentLink" :lazy-src="noImage" height="400px" contain></v-img>
        <!-- </v-row> -->
        <!-- <v-row class="justify-center"> -->
        <!-- center-active mandatory -->
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
      <!-- </v-row> -->
    </v-col>

    <v-col cols="12" sm="6" offset-lg="1" lg="5">
      <!-- <v-row>
            <v-col cols="12"> -->
      <h2 class="dgrey--text">{{ commodity.name }}</h2>
      <h4 class="shopfont--text">{{ commodity.brand }}</h4>
      <div class="caption mt-12">
        <h2 max-width="150px" class="speciﬁcations mt-1">{{ commodity.speciﬁcations }}</h2>
      </div>
      <div class="price d-flex flex-column justify-end align-center align-sm-end">
        <h3 class="darkGrey--text my-6 mx-0">{{ commodity.price }} AUD</h3>
        <v-card flat style="position: relative; box-sizing: border-box" class="px-4 px-sm-10">
          <span
            v-if="!commodity.amount"
            style="position: absolute; top: -20px; font-size: 14px; left: 50%; transform: translateX(-50%)"
            >not available</span
          >
          <v-btn
            :disabled="!commodity.amount"
            small
            width="100%"
            class="pa-2 mt-2 dgrey--text"
            color="orange"
            @click="addToCart"
            >Add to card</v-btn
          >
          <v-btn
            :disabled="!commodity.amount"
            small
            width="100%"
            class="pa-2 mt-4 white--text"
            color="dgrey"
            @click="buyNow"
            >Buy it now</v-btn
          >
        </v-card>
      </div>
    </v-col>
    <AlsoViewed :commodities="alsoViewedCommodities" :loading="isCommodityLoading" />
  </v-row>
</template>

<script>
import { mapState } from 'vuex';

import AlsoViewed from '@/components/Shop/AlsoViewed.vue';

export default {
  name: 'ShopItem',
  components: { AlsoViewed },
  props: ['section'],
  data() {
    return {
      // commodityId: this.$route.params.commodityId,
      activeCard: 0,
      noImage: require('@/assets/no-image.png'),
    };
  },
  watch: {
    commodityId(newVal) {
      this.$store.dispatch('shop/GET_COMMODITY', {
        commodityId: newVal,
      });
    },
  },
  computed: {
    ...mapState(['viewportWidth']),
    ...mapState('shop', ['categories', 'commodities', 'commodity', 'isCommodityLoading', 'fullListOfCategories']),
    mobileMenu() {
      return this.viewportWidth < 960;
    },
    alsoViewedCommodities() {
      const array = this.$store.getters['shop/alsoViewedCommodities'];
      if (!Array.isArray(array)) return [];
      return array.slice(0, 4);
    },
    previewImgs() {
      console.log('img',this.commodity?.images ?? [])
      return this.commodity?.images ?? [];
    },
    currentLink() {
      return this.commodity.images[this.activeCard]?.link ?? this.noImage;
    },
    alsoViewedCommoditiesLink() {
      this.fullListOfCategories;
      if (!this.alsoViewedCommodities.length) return;
      const categoryId = this.alsoViewedCommodities[0].subCategoryId || this.alsoViewedCommodities[0].categoryId;
      console.log('fullListOfCategories',[...this.fullListOfCategories])
      const category = this.fullListOfCategories.find(el => el._id === categoryId);
      if (category && category.slug) return category.slug;
      return '';
    },
  },
  methods: {
    goToCard(id) {
      this.$store.dispatch('shop/GET_COMMODITY', {
        commodityId: id,
      });
      this.$router.push({
        name: 'shop-item',
        params: { categoryName: this.alsoViewedCommoditiesLink, commodityId: id },
      });
    },
    // setPhoto(val, toggle) {
    //   toggle();
    //   this.activeCard = val.link;
    // },
    addToCart() {
      this.$store.dispatch('productCart/ADD_TO_CART', this.$route.params.commodityId);
    },
    buyNow() {
      this.addToCart();
      this.$router.push({ name: 'shop-payment' });
    },
  },
  async mounted() {
    await this.$store.dispatch('shop/GET_COMMODITY', {
      commodityId: this.$route.params.commodityId,
    });
    this.$store.dispatch('shop/SET_NEW_CATEGORY', { category: this.$route.params.categoryName });
  },
  beforeDestroy() {
    this.$store.commit('shop/CLEAR_COMMODITY');
  },
};
</script>

<style lang="scss">
@import '@/css/variables.scss';
.card-active {
  opacity: 1;
}
// .image-row {
//   height: 430px;
// }
.card-disabled {
  cursor: pointer;
  opacity: 0.4;
}
// This should not be removed
.speciﬁcations {
  white-space: pre-wrap;
}
// .caption {
// margin-top: 50px;
// h2 {
// margin-top: 5px;
// }
// }

.price {
  width: 100%;
  // display: flex;
  // flex-direction: column;
  // justify-content: flex-end;
  // align-items: flex-end;
  // h3 {
  //   margin: 25px 0;
  // }
}
// .dark-gray-font {
//   color: $darkGrayFont;
// }
// .gray-font {
//   color: $shopGrayFont;
// }
// .description {
//   padding-top: 25px;
// }
@media screen and (max-width: 320px) {
  .caption {
    h2 {
      font-size: 14px;
    }
  }
}
</style>
