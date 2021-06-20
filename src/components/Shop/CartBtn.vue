<template>
  <v-btn text @click="$emit('click')" style="position: relative" class="black--text">
    <span v-if="getTotalItem" class="commodity-count">{{ getTotalItem }}</span>
    <!-- <v-icon color="secondaryGray">mdi-shopping</v-icon> -->
    <IconCart :width="30" />
  </v-btn>
</template>

<script>
import { mapGetters } from 'vuex';
import IconCart from '@/components/svg/IconCart.vue';

export default {
  name: 'CartBtn',
  components: {
    IconCart,
  },
  computed: {
    ...mapGetters('productCart', ['getSumPrice', 'getTotalItem', 'commodityCards']),
  },
};
</script>

<style scoped>
.commodity-count {
  position: absolute;
  top: 0;
  left: 58%;
  transform: translateX(-50%);
}
</style>
