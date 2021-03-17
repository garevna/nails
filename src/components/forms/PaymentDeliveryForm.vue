<template>
  <v-card flat class="homefone">
    <h3 class="text-center" v-if="!disabledRadioBtn">Select the type of delivery</h3>
    <h3 class="text-center" v-if="disabledRadioBtn">Your order must not be less than $50. Pickup available only.</h3>
    <v-card flat width="100%" class="d-flex justify-center transparent">
      <DeliveryBtnGroup :type.sync="deliveryType" :disabledBtn="disabledRadioBtn" :isMobile="mobileMenu"/>
    </v-card>

    <v-card flat v-if="deliveryType === 'pickup'" class="transparent d-flex flex-column align-center text-center">
      <v-card-title>Store pickup (32 Brewer road, Bentleigh 3204 VIC)</v-card-title>
      <a
        href="https://www.google.com/maps/place/32+Brewer+Rd,+Bentleigh+VIC+3204,+Australia/@-37.9210937,145.0245635,17z/data=!3m1!4b1!4m5!3m4!1s0x6ad669362f999ea7:0x74f5bebcdaa8a83e!8m2!3d-37.9210937!4d145.0267522"
        target="_blank"
      >
        <v-img src="map_nails.png" width="300" height="300" contain />
      </a>
      <v-card-text>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam, placeat ullam ipsam voluptates recusandae ex
        tenetur vitae voluptatibus omnis, corporis explicabo nihil sunt libero eveniet excepturi est distinctio expedita
        vel!
      </v-card-text>
    </v-card>

    <v-card flat v-if="deliveryType === 'standard'" class="transparent d-flex flex-column align-center text-center">
      <v-card-title>standard shipping Aus post - shipping within Australia (cost ${{ standard.price }}) </v-card-title>
      <v-card-text>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam, placeat ullam ipsam voluptates recusandae ex
        tenetur vitae voluptatibus omnis, corporis explicabo nihil sunt libero eveniet excepturi est distinctio expedita
        vel!
      </v-card-text>
      <v-img :src="standard.flag" width="300" height="300" contain />
    </v-card>

    <v-card flat v-if="deliveryType === 'express'" class="transparent d-flex flex-column align-center text-center">
      <v-card-title>shipping Aus post - shipping within Australia (cost ${{ express.price }}) </v-card-title>
      <v-card-text>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam, placeat ullam ipsam voluptates recusandae ex
        tenetur vitae voluptatibus omnis, corporis explicabo nihil sunt libero eveniet excepturi est distinctio expedita
        vel!
      </v-card-text>
      <v-img :src="express.flag" width="300" height="300" contain />
    </v-card>

    <v-card flat v-if="deliveryType === 'international'" class="transparent">
      <v-card-title>international shipping - International shipping (cost is optional for each country)</v-card-title>

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
    <PrevNextBtns @prev="$emit('prev')" @next="next" prevIcon="mdi-shopping" prevText="back to cart" />
  </v-card>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

import DeliveryBtnGroup from '@/components/forms/DeliveryBtnGroup.vue';
import PrevNextBtns from '@/components/forms/PrevNextBtns.vue';
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
    disabledRadioBtn() {
      return this.getSumPrice < 50;
    },
    mobileMenu() {
      return this.viewportWidth < 960;
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
    if (this.getSumPrice < 50) this.deliveryType = 'pickup';
  },
};
</script>
