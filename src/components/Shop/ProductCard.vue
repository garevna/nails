<template>
  <v-card class="ma-4 pa-4 d-flex flex-column flex-md-row align-center justify-md-space-between">
    <v-list-item-avatar tile width="100" height="100" class="pa-0 ma-0">
      <CoverImage :url="checkCourseLink(product)" />
    </v-list-item-avatar>
    <v-spacer />
    <v-card flat :width="descrWidth" class="text-center">
      <v-card-title class="d-block text-center">{{ product.name }}</v-card-title>

      <v-card-text>{{ product.brand }}</v-card-text>
    </v-card>
    <v-spacer />
    <v-card-actions class="d-flex justify-center">
      <v-btn color="blue darken-1" :disabled="disabledMinus" icon @click="decrementCount(product._id)">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-card-text class="error--text" style="font-size: 18px; font-weight: bold">{{ product.count }}</v-card-text>
      <v-btn color="blue darken-1" :disabled="disabledPlus" icon @click="incrementCount(product._id)">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-card-actions>
    <v-card flat>
      <table class="text-center">
        <tr>
          <th class="pa-4">Price</th>
          <th class="pa-4">Summ</th>
        </tr>
        <tr>
          <td>${{ product.price }}</td>
          <td>${{ summPriceItem }}</td>
        </tr>
      </table>
    </v-card>

    <v-card-actions class="justify-center">
      <v-btn color="blue darken-1" icon @click="deleteFromCart(product._id)">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style lang="scss" scoped>
@import '@/css/variables.scss';
</style>

<script>
import { mapState } from 'vuex';

import CoverImage from '@/components/CoverImage.vue';
import checkCourseLink from '@/helpers/checkCourseLink';

export default {
  name: 'ProductCard',
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
    ...mapState(['viewportWidth']),
    descrWidth() {
      let width = 300;
      if (this.viewportWidth < 960) width = 250;
      if (this.viewportWidth < 800) width = 200;
      return width;
    },
    summPriceItem() {
      return Math.trunc(this.product.count * this.product.price * 100) / 100;
    },
    disabledPlus() {
      return this.product.count >= this.product.amount || this.product.count >= 99 || this.product.amount === 0;
    },
    disabledMinus() {
      return this.product.count <= 1;
    },
  },
  methods: {
    checkCourseLink,
    deleteFromCart(id) {
      this.$store.dispatch('productCart/DELETE_FROM_CART', id);
    },
    incrementCount(id) {
      this.$store.dispatch('productCart/INCREMENT_COUNT', id);
    },
    decrementCount(id) {
      this.$store.dispatch('productCart/DECREMENT_COUNT', id);
    },
  }
};
</script>
