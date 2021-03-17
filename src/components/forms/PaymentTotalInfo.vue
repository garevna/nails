<template>
  <v-card flat class="homefone text-center">
    <h2 class="text-center pb-8"> Total info</h2>

    <v-row>
      <v-col cols="12" md="6">
        <v-card-title class="d-flex justify-center"> User info</v-card-title>
        <table style="margin: auto" class="text-left row-padding">
          <tr>
            <th>First name</th>
            <td>{{ submitObj.firstName }}</td>
          </tr>
          <tr>
            <th>Last name</th>
            <td>{{ submitObj.lastName }}</td>
          </tr>
          <tr>
            <th>Phone</th>
            <td>{{ submitObj.phone }}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{{ submitObj.email }}</td>
          </tr>
          <tr>
            <th>Delivery country</th>
            <td>{{ deliveryCountry.country }}</td>
          </tr>
          <tr>
            <th>Delivery address</th>
            <td>{{ submitObj.deliveryAddress }}</td>
          </tr>
        </table>
      </v-col>

      <v-col cols="12" md="6">
        <v-card-title class="d-flex justify-center"> Cart info</v-card-title>
        <table style="margin: auto">
          <tr>
            <th>Name</th>
            <th>Brand</th>
            <th>Count</th>
            <th>Price</th>
            <th>Cost</th>
          </tr>
          <tr v-for="commodity in tableRow" :key="commodity.id">
            <td>{{ commodity.name }}</td>
            <td>{{ commodity.brand }}</td>
            <td>{{ commodity.count }}</td>
            <td>{{ commodity.price }}</td>
            <td>{{ commodity.cost }}</td>
          </tr>
        </table>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6">
        <v-card flat class="d-flex flex-column align-center text-center transparent">
          <v-card-title>Delivery</v-card-title>
          <v-card-text>Type delivery: {{ deliveryCountry.type.toUpperCase() }}</v-card-text>
          <img :src="deliveryCountry.flag" width="150" height="100" />
          <v-card-text>Code:{{ deliveryCountry.countryCode }}</v-card-text>
          <v-card-text class="py-0">Country:{{ deliveryCountry.country }}</v-card-text>
          <v-card-text>Delivery cost:{{ deliveryCountry.price }}</v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card flat class="d-flex flex-column align-center text-center transparent">
          <v-card-title>Total cost</v-card-title>
          <table style="margin: auto" class="text-left">
            <tr>
              <th>Total count</th>
              <td>{{ getTotalItem }}</td>
            </tr>
            <tr>
              <th>Total cost (without delivery)</th>
              <td>{{ getSumPrice }}</td>
            </tr>
            <tr>
              <th>Delivery</th>
              <td>{{ deliveryCountry.price }}</td>
            </tr>
            <tr :style="{ color: $vuetify.theme.themes.dark.buttons }">
              <th>Total cost (with delivery)</th>
              <td>{{ deliveryCountry.price + getSumPrice }}</td>
            </tr>
          </table>
        </v-card>
      </v-col>
    </v-row>

    <PrevNextBtns
      @prev="$emit('prev')"
      @next="$emit('next')"
      :nextDisabled="loading"
      nextText="pay"
      nextIcon="mdi-credit-card-outline"
      class="my-8"
    />
  </v-card>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import PrevNextBtns from '@/components/forms/PrevNextBtns.vue';

export default {
  name: 'PaymentTotalInfo',
  props: {
    submitObj: {
      type: Object,
      required: true,
    },
    deliveryCountry: {
      type: Object,
      required: true,
    },
  },
  components: {
    PrevNextBtns,
  },
  data() {
    return {};
  },

  computed: {
    ...mapState('shopPayment', ['loading']),
    ...mapGetters('productCart', ['commodityCards', 'getTotalItem', 'getSumPrice']),
    tableRow() {
      return this.commodityCards.map(item => ({
        id: item._id,
        name: item.name,
        brand: item.brand,
        count: item.count,
        price: item.price,
        cost: item.count * item.price,
      }));
    },
  },
  methods: {},
  mounted() {},
};
</script>
<style scoped>
th,td {
  padding: 10px;
}
</style>
