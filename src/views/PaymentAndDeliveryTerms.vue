<template>
  <v-container>
    <h2 class="text-center my-4">Payment and Delivery Terms</h2>

    <v-card flat class="transparent">
      <v-card-title>How To Make an Order</v-card-title>
      <v-card-text>
        <p>
          To make an order, add selected products to the shopping cart, confirm your details and continue with the
          payment.
        </p>
      </v-card-text>
    </v-card>

    <v-row>
      <v-col cols="12" sm="6">
        <v-card flat class="transparent">
          <v-card-title>Delivery</v-card-title>
          <v-card-text>
            <p>Minimum order amount:</p>
            <p>for Australia - $20</p>
            <p>other countries - $50</p>
            <p>Delivery processed via Auspost</p>
            <p class="ma-0">Express (1-3 business days) - $12.20</p>
            <p>Standard (3-5 business days) - $9.20</p>
            <p>
              If you’d like to know more about delivery options to NZ and other countries or you’d like to order a big
              batch please contact <span class="orange--text">nailsauinfo@gmail.com</span>
            </p>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6">
        <v-card flat class="transparent">
          <v-card-title>Warranty and Returns</v-card-title>
          <v-card-text>
            <p>
              We only sell genuine products with guaranteed quality. It is quite improbable that the product is faulty.
              In the slight chance the product is faulty or you have any issues with the product, please let us know
              within 14 days of the delivery date and email us photos of the faulty product. Please keep the original
              package for the full warranty period. We do not accept returns of products without the original package.
            </p>
            <p>
              In case of a faulty product, we will return your payment for the product, or exchange the product for a
              usable copy.
            </p>
            <p>Cosmetics cannot be returned or exchanged.</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'PaymentAndDeliveryTerms',
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState(['viewportWidth']),
    mobileMenu() {
      return this.viewportWidth < 960;
    },
  },
  watch: {},
  methods: {},
};
</script>
