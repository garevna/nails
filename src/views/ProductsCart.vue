<template>
  <div>
    <div class="mt-12">
      <v-card
        v-if="getTotalItem"
        flat
        class="d-flex flex-column align-center"
        outlined
        style="overflow: scroll; overflow-x: hidden"
        height="55vh"
      >
        <ProductCard v-for="commodity in commodityCards" :key="commodity._id" :product="commodity" />
      </v-card>
      <v-card v-else flat>
        <h2 class="empty-cart">Your cart is empty</h2>
      </v-card>
    </div>
    <v-footer absolute class="homefone pa-0 pb-6">
      <v-card flat tile class="primary pb-4" width="100%">
        <div flat style="position: relative" class="pb-3">
          <v-card-title class="d-block text-center" style="font-size: 16px">In your cart: </v-card-title>
          <v-card-text class="d-block text-center pa-0" style="position: absolute; bottom: 0; left: 0; font-size: 16px"
            >Minimum order for delivery - $20</v-card-text
          >
        </div>

        <v-card flat class="transparent px-4 text-center">
          <table style="margin: auto; cursor: pointer">
            <tr>
              <td>
                Total numbers of items:
                <span style="font-size: 16px" :style="{ color: $vuetify.theme.themes.dark.error }">{{
                  getTotalItem
                }}</span>
              </td>
              <td class="px-4">
                Total amount: <span style="font-size: 16px">${{ getSumPrice }}</span>
              </td>
              <td v-if="!responseBtn">
                <v-btn
                  :disabled="!getTotalItem"
                  rounded
                  outlined
                  large
                  class="px-8 dgrey--text"
                  style="font-size: 16px"
                  @click="buy"
                  >Buy</v-btn
                >
              </td>
            </tr>
          </table>

          <v-btn
            v-if="responseBtn"
            :disabled="!getTotalItem"
            rounded
            outlined
            large
            class="px-8 dgrey--text mt-2"
            style="font-size: 16px"
            @click="buy"
            >Buy</v-btn
          >
        </v-card>
      </v-card>
    </v-footer>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import ProductCard from '@/components/Shop/ProductCard.vue';

export default {
  name: 'ProductsCart',
  components: {
    ProductCard,
  },
  computed: {
    ...mapState(['viewportWidth']),
    ...mapState('auth', ['isLogged']),
    ...mapState('productCart', ['cart', 'commodities']),
    ...mapGetters('productCart', ['getSumPrice', 'getTotalItem', 'commodityCards']),
    ...mapGetters('shopPayment', ['minimumDeliveryPrice']),
    responseBtn() {
      return this.viewportWidth < 400;
    },
    showPurchaseLimit() {
      return this.getSumPrice < 50;
    },
  },
  methods: {
    buy() {
      if (!this.isLogged) {
        this.$router.push({ name: 'sign-in' });
        return;
      }
      this.$router.push({ name: 'shop-payment' });
    },
  },
  mounted() {
    this.$store.dispatch('productCart/GET_COMMODITIES');
  },
};
</script>

<style scoped>
.empty-cart {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>