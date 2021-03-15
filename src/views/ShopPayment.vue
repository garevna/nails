<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" offset-md="2" md="8">
        <StepLine :currentStep="tab" :steps="items" />
      </v-col>
    </v-row>

    <!-- <v-tabs v-model="tab" background-color="homefone accent-4" centered dark icons-and-text :style="`border-top: 2px solid ${$vuetify.theme.themes.dark.primary};
    border-bottom: 2px solid ${$vuetify.theme.themes.dark.primary}`" class="mt-4">

      <v-tab v-for="i in items" :key="i.text">
        {{ i.text }}
      </v-tab>
    </v-tabs> -->

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
              <v-col cols="12" offset-sm="2" sm="8" offset-md="4" md="4">
                <PaymentDetailsForm :pickup="pickupDelivery" @prev="back" @next="detailNext" class="my-4" />
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
import { mapState } from 'vuex';
import PaymentDeliveryForm from '@/components/forms/PaymentDeliveryForm.vue';
import StepLine from '@/components/StepLine.vue';
import PaymentDetailsForm from '@/components/forms/PaymentDetailsForm.vue';
import PaymentTotalInfo from '@/components/forms/PaymentTotalInfo.vue';

export default {
  name: 'ShopPayment',
  components: { PaymentDeliveryForm, StepLine, PaymentDetailsForm, PaymentTotalInfo },
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
          products: this.cart.map(item => ({
            productId: item._id,
            mount: item.count,
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
      console.log(this.details);
    },
  },
  mounted() {},
};
</script>
