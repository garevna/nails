<template>
  <v-card flat class="transparent d-flex  flex-column justify-center align-center">
    <h2 class="text-center my-4">Payment and Delivery Terms</h2>

    <v-card flat class="transparent" max-width="600">
      <v-card-title class="justify-center">How To Make an Order</v-card-title>
      <v-card-text class="text-justify colorParagraph--text">
        <p>
          To make an order, add selected products to the shopping cart, confirm your details and continue with the
          payment.
        </p>
      </v-card-text>
    </v-card>
        <v-card flat class="transparent" max-width="600">
          <v-card-title class="justify-center">Delivery</v-card-title>
          <v-card-text class="text-justify colorParagraph--text">
            <p>Minimum order amount:</p>
            <p class="ma-0">for Australia - ${{ minimumOrderAmountForAustralia }}</p>
            <p>other countries - ${{ minimumOrderAmountForOtherCountries }}</p>
            <p>Delivery processed via Auspost</p>
            <p class="ma-0">Express (1-3 business days) - ${{ expressPrice }}</p>
            <p>Standard (3-5 business days) - ${{ standardPrice }}</p>
            <p>
              If you’d like to know more about delivery options to NZ and other countries or you’d like to order a big batch please contact
              <a href="mailto:nailsauinfo@gmail.com">nailsauinfo@gmail.com</a>
            </p>
          </v-card-text>
        </v-card>

        <v-card flat class="transparent" max-width="600">
          <v-card-title class="justify-center">Warranty and Returns</v-card-title>
          <v-card-text class="text-justify colorParagraph--text">
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
  </v-card>
</template>

<script>
import { mapState } from 'vuex';

import {
  minimumOrderAmountForAustralia,
  minimumOrderAmountForOtherCountries,
} from '@/config/delyvery';

export default {
  name: 'PaymentAndDeliveryTerms',
  components: {},
  data() {
    return {
      minimumOrderAmountForAustralia,
      minimumOrderAmountForOtherCountries,
    };
  },
  computed: {
    ...mapState('shopPayment', ['express', 'standard', 'international', 'pickup']),
    expressPrice(){
      return this.express?.price || '';
    },
    standardPrice(){
      return this.standard?.price || '';
    },
  },
  created() {
    this.$store.dispatch('shopPayment/GET_DELIVERY_PRICES');
  },
};
</script>
