<template>
  <v-btn icon @click="$emit('click')" style="position: relative">
    <span
      v-if="getTotalItem"
      style="position: absolute; top: -19px; left: 50%; transform: translateX(-50%); color: #000"
      >{{ getTotalItem }}</span
    >
    <v-icon color="secondaryGray">mdi-shopping</v-icon>
  </v-btn>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'CartBtn',
  computed: {
    ...mapGetters('productCart', ['getSumPrice', 'getTotalItem', 'commodityCards']),
  },
};
</script>

<style></style>
