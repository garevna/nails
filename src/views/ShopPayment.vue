<template>
  <v-container fluid>
    <v-row v-if="!mobileMenu">
      <v-col cols="12" offset-md="2" md="8">
        <StepLine :currentStep="tab" :steps="items" />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-tabs-items v-model="tab" class="homefone">
          <v-tab-item v-for="(item, index) in items" :key="item.text" :value="index">
            <PaymentDeliveryForm
              v-if="item.type === 'delivery'"
              :deliveryInternationId.sync="deliveryInternationId"
              :typeDelivery.sync="typeDelivery"
              @prev="back"
              @next="deliveryNext"
            />
            <v-row v-if="item.type === 'detail'">
              <v-col cols="12" offset-sm="2" sm="8" offset-md="3" md="6">
                <PaymentDetailsForm
                  :pickup="pickupDelivery"
                  @prev="back"
                  @next="detailNext"
                  :country="deliveryCountry.countryCode"
                  class="my-4"
                />
              </v-col>
            </v-row>
            <PaymentTotalInfo
              v-if="item.type === 'total'"
              :submitObj="submitObj"
              :deliveryCountry="deliveryCountry"
              @prev="back"
              @next="pay"
            />
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'ShopPayment',
  components: {
    PaymentDeliveryForm: () => import('@/components/forms/PaymentDeliveryForm.vue'),
    StepLine: () => import('@/components/StepLine.vue'),
    PaymentDetailsForm: () => import('@/components/forms/PaymentDetailsForm.vue'),
    PaymentTotalInfo: () => import('@/components/forms/PaymentTotalInfo.vue'),
  },
  data() {
    return {
      tab: 0,
      pickupDelivery: false,
      deliveryInternationId: '',
      typeDelivery: '',
      details: null,
      items: [
        {
          text: 'Delivery',
          type: 'delivery',
        },
        {
          text: 'Detail',
          type: 'detail',
        },
        {
          text: 'Total',
          type: 'total',
        },
      ],
      totalInfo: null,
    };
  },
  computed: {
    ...mapState(['viewportWidth']),
    ...mapState('auth', ['user']),
    ...mapState('shopPayment', ['express', 'standard', 'pickup', 'international']),
    ...mapState('productCart', ['cart']),
    ...mapGetters('productCart', ['commodityCards']),
    mobileMenu() {
      return this.viewportWidth < 960;
    },
    deliveryCountry() {
      if (this.typeDelivery === 'express') return this.express;
      if (this.typeDelivery === 'standard') return this.standard;
      if (this.typeDelivery === 'pickup') return this.pickup;
      if (this.typeDelivery === 'international')
        return this.international.find(item => item._id === this.deliveryInternationId);
      return {};
    },
    submitObj() {
      return Object.assign(
        {
          deliveryTypeId: this.deliveryTypeId,
          userId: this?.user?._id ?? '',
          products: this.commodityCards.map(item => ({
            productId: item._id,
            purchasedAmount: item.count,
          })),
        },
        this.details
      );
    },
    deliveryTypeId() {
      return this.deliveryCountry?._id ?? '';
    },
  },
  watch: {},
  methods: {
    back() {
      if (this.tab <= 0) {
        this.$router.push({ name: 'products-cart' });
        return;
      }
      this.tab -= 1;
    },
    deliveryNext({ id, type }) {
      this.pickupDelivery = type === 'pickup';
      this.deliveryInternationId = id;
      this.typeDelivery = type;
      this.next();
    },
    detailNext(data) {
      this.details = data;
      this.next();
    },
    next() {
      if (this.tab >= this.items.length - 1) return;
      this.tab += 1;
    },
    pay() {
      this.$store.dispatch('shopPayment/PAY', this.submitObj);
    },
  },
  mounted() {},
};
</script>
