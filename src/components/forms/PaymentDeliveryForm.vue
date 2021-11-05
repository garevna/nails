<template>
  <v-card flat class="homefone">
    <h3
      class="text-center"
      v-if="getSumPrice >= minimumOrderAmountForAustralia"
    >
      Select the type of delivery
    </h3>

    <h5
      class="text-center"
      v-else
    >
      Your order must not be less than ${{minimumOrderAmountForAustralia}}. Pickup available only.
    </h5>

    <h5
      class="text-center"
      v-if="getSumPrice < minimumOrderAmountForOtherCountries"
    >
      For delivery to other countries, your order must not be less than ${{minimumOrderAmountForOtherCountries}}.
    </h5>

    <v-card flat width="100%" class="d-flex justify-center transparent">
      <DeliveryBtnGroup :type.sync="deliveryType" :buttons="buttons" :isMobile="mobileMenu" />
    </v-card>

    <v-card flat v-if="deliveryType === 'pickup'" class="transparent d-flex flex-column align-center text-center">
      <v-card-title>Store pickup (32 Brewer road, Bentleigh 3204 VIC)</v-card-title>
      <a
        href="https://www.google.com/maps/place/32+Brewer+Rd,+Bentleigh+VIC+3204,+Australia/@-37.9210937,145.0245635,17z/data=!3m1!4b1!4m5!3m4!1s0x6ad669362f999ea7:0x74f5bebcdaa8a83e!8m2!3d-37.9210937!4d145.0267522"
        target="_blank"
      >
        <v-img src="map_nails.png" width="600" height="284" cover />
      </a>
      <v-card-text>
        {{ contactUs }} <a href="mailto:nailsauinfo@gmail.com">nailsauinfo@gmail.com</a>
      </v-card-text>
    </v-card>

    <v-card flat v-if="deliveryType === 'standard'" class="transparent d-flex flex-column align-center text-center">
      <v-card-title>standard shipping Aus post - shipping within Australia (cost ${{ standard.price }}) </v-card-title>
      <v-card-text>
        Free standard delivery for orders over $300
      </v-card-text>
      <v-img :src="standard.flag" width="300" height="300" contain />
      <v-card-text>
        {{ contactUs }} <a href="mailto:nailsauinfo@gmail.com">nailsauinfo@gmail.com</a>
      </v-card-text>
    </v-card>

    <v-card flat v-if="deliveryType === 'express'" class="transparent d-flex flex-column align-center text-center">
      <v-card-title>express shipping Aus post - shipping within Australia (cost ${{ express.price }}) </v-card-title>
      <v-img :src="express.flag" width="300" height="300" contain />
      <v-card-text>
        {{ contactUs }} <a href="mailto:nailsauinfo@gmail.com">nailsauinfo@gmail.com</a>
      </v-card-text>
    </v-card>

    <v-card flat v-if="deliveryType === 'international'" class="transparent">
      <h4 class="text-center pb-4">International shipping - International shipping (cost is optional for each country)</h4>

      <v-row>
        <v-col cols="12" sm="5" md="4">
          <v-text-field v-model="countrySearch" outlined prepend-inner-icon="mdi-magnify" />
          <h5 class="text-center py-4">Countries</h5>
          <v-list dense outlined max-height="300" style="overflow: scroll; overflow-x: hidden" class="homefone">
            <v-list-item-group v-model="selectedItem" color="primary">
              <v-list-item
                v-for="item in filteredInternational"
                :key="item._id"
                @click="currInternationalPriceId = item._id"
              >
                {{ item.country }}
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>

        <v-col cols="12" sm="7" md="8">
          <v-card
            flat
            v-if="currInternationalPrice"
            height="100%"
            class="transparent d-flex flex-column align-center text-center"
          >
            <v-img :src="currInternationalPrice.flag" width="300" height="200" contain />
            <v-card-title>{{ currInternationalPrice.country }}</v-card-title>
            <v-card-text>Cost: ${{ currInternationalPrice.price }}</v-card-text>
          </v-card>

          <v-card
            flat
            v-else
            height="100%"
            class="transparent d-flex justify-center flex-column align-center text-center"
          >
            <v-card-title>Choose a country from the list</v-card-title>
            <v-card-text>You can use the search bar</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
    <PrevNextBtns @prev="$emit('prev')" @next="next" prevIcon="mdi-shopping" prevText="back to cart" class="pt-16" :nextDisabled="!getTotalItem"/>
  </v-card>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

import DeliveryBtnGroup from '@/components/forms/DeliveryBtnGroup.vue';
import PrevNextBtns from '@/components/forms/PrevNextBtns.vue';
import {
  contactUs,
  minimumOrderAmountForPickup,
  minimumOrderAmountForAustralia,
  minimumOrderAmountForOtherCountries,
} from '@/config/delyvery';

export default {
  name: 'PaymentDeliveryForm',
  components: {
    DeliveryBtnGroup,
    PrevNextBtns,
  },
  data() {
    return {
      deliveryType: '',
      currInternationalPriceId: '',
      selectedItem: null,
      countrySearch: '',
      contactUs,
      minimumOrderAmountForAustralia,
      minimumOrderAmountForOtherCountries,
    };
  },

  computed: {
    ...mapState(['viewportWidth']),
    ...mapState('shopPayment', ['express', 'standard', 'international', 'pickup']),
    ...mapGetters('productCart', ['commodityCards', 'getTotalItem', 'getSumPrice']),
    filteredInternational() {
      return this.international
        .filter(country => country.country.toLowerCase().includes(this.countrySearch.toLowerCase()))
        .sort((min, max) => (min.country < max.country ? -1 : 0));
    },
    currInternationalPrice() {
      return this.international.find(item => item._id === this.currInternationalPriceId);
    },
    mobileMenu() {
      return this.viewportWidth < 960;
    },
    buttons(){
      return [
        {
          label: 'Pickup',
          value: 'pickup',
          disabled: this.getSumPrice < minimumOrderAmountForPickup,
        },
        {
          label: 'Express shipping Aus post',
          value: 'express',
          disabled: this.getSumPrice < minimumOrderAmountForAustralia,
        },
        {
          label: 'Standard shipping Aus post',
          value: 'standard',
          disabled: this.getSumPrice < minimumOrderAmountForAustralia,
        },
        {
          label: 'International shipping ',
          value: 'international',
          disabled: this.getSumPrice < minimumOrderAmountForOtherCountries,
        },
      ]
    },
  },
  watch: {},
  methods: {
    ...mapMutations({
      message: 'MESSAGE',
    }),
    validation() {
      if (!this.deliveryType) {
        this.message({
          message: true,
          messageType: 'Delivery',
          messageText: 'Please, select delivery type !!!',
        });
        return false;
      }
      if (this.deliveryType === 'international' && !this.currInternationalPriceId) {
        this.message({
          message: true,
          messageType: 'Delivery',
          messageText: 'Please, select country !!!',
        });
        return false;
      }
      return true;
    },
    next() {
      if (!this.validation()) return;
      const data = {
        type: this.deliveryType,
        id: this.currInternationalPriceId,
      };
      this.$emit('next', data);
    },
  },
  mounted() {
    this.$store.dispatch('shopPayment/GET_DELIVERY_PRICES');
    this.deliveryType = 'pickup';
  },
};
</script>
