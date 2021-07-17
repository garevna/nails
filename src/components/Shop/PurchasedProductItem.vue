<template>
  <v-card class="ma-2 pa-2 d-flex flex-row align-center">
    <v-list-item-avatar tile width="80" height="80" class="pa-0 ma-0">
      <CoverImage :url="checkUrl(product)" />
    </v-list-item-avatar>

    <v-card flat class="ma-0 pa-0 d-flex flex-column align-center">
      <v-card-title class="mx-4 pa-0 d-block text-center" style="font-size: 14px; font-weight: bold">
        {{ product.name }}
      </v-card-title>

      <v-card-text class="mx-4 px-4 py-0" style="font-size: 14px"> ${{ product.price }} </v-card-text>

      <v-card-text class="mx-4 px-4 py-0" style="font-size: 14px"> {{ product.purchasedAmount }} pieces </v-card-text>
    </v-card>
  </v-card>
</template>

<style lang="scss" scoped>
@import '@/css/variables.scss';
</style>

<script>
import CoverImage from '@/components/CoverImage.vue';

export default {
  name: 'PurchasedProductItem',
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  components: {
    CoverImage,
  },
  data() {
    return {
      coverImageSrc: require('@/assets/no-image.png'),
    };
  },
  watch: {},
  computed: {
    summPriceItem() {
      return this.product.count * this.product.price;
    },
    disabledPlus() {
      return this.product.count >= this.product.amount || this.product.count >= 99 || this.product.amount === 0;
    },
    disabledMinus() {
      return this.product.count <= 1;
    },
  },
  methods: {
    checkUrl(card) {
      let img;
      if (card.previewImage && Array.isArray(card.previewImage) && card.previewImage.length) {
        img = card.previewImage[0].link;
      }
      if (!img) {
        img = this.coverImageSrc;
      }
      return img;
    },
  },
  created() {},
};
</script>
