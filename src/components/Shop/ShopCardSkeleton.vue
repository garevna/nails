<template>
  <div class="d-flex justify-center flex-wrap">
    <v-card class="pa-0 pt-0 ma-4 shop-card-skeleton" v-for="i in count" :key="i" color="lgrey" :width="width" :height="height">
      <v-skeleton-loader type="image, list-item-three-line" animation></v-skeleton-loader>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'ShopCardSkeleton',
   props: {
    width: {
      type: String,
      default: '250',
    },
    height: {
      type: String,
      default: '350',
    },
    count: {
      type: Number,
      default: 12,
    }
  },
};
</script>

<style lang="scss">
.shop-card-skeleton {
  & .v-skeleton-loader__image {
    height: 250px !important;
  }
}
</style>