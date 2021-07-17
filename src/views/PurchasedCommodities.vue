<template>
  <v-container>
    <Spinner v-if="loading" />

    <h3 v-if="!loading && !orders.length" class="text-center">You have no purchased commodities</h3>

    <v-data-iterator
      v-if="!loading && orders.length"
      :items="orders"
      :items-per-page.sync="itemsPerPage"
      :page.sync="page"
      item-key="_id"
      :search="search"
      :single-expand="true"
      :sort-by="sortBy.prop"
      :sort-desc="sortDesc"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar dark color="orange darken-3" class="my-1">
          <v-text-field
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="Search"
          ></v-text-field>

          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer></v-spacer>

            <v-select
              v-model="sortBy"
              flat
              solo-inverted
              hide-details
              :items="keys"
              prepend-inner-icon="mdi-magnify"
              label="Sort by"
              :hint="`${keys.text}, ${keys.prop}`"
              item-text="text"
              item-value="prop"
              persistent-hint
              return-object
              single-line
            ></v-select>

            <v-spacer></v-spacer>

            <v-btn-toggle v-model="sortDesc" mandatory>
              <v-btn large depressed color="orange" :value="false">
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>

              <v-btn large depressed color="orange" :value="true">
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-toolbar>
      </template>

      <template v-slot:default="{ items, isExpanded, expand }">
        <v-card v-for="order in items" :key="order._id" class="my-4">
          <v-card-title>
            <v-row v-if="$vuetify.breakpoint.xs">
              <v-col cols="12" xs="12">
                <h5 class="text-truncate">
                  {{ new Date(order.createdAt).toLocaleDateString() }}
                </h5>
              </v-col>
            </v-row>

            <v-row v-else>
              <v-col cols="12" sm="4" md="3">
                <h5 class="text-truncate">
                  {{ new Date(order.createdAt).toLocaleDateString() }}
                </h5>
              </v-col>
              <v-col cols="12" sm="8" md="9">
                <h5 class="text-truncate">
                  <span v-if="$vuetify.breakpoint.mdAndUp" style="font-weight: normal"> Status: </span>
                  {{ order.status }}
                </h5>
              </v-col>
            </v-row>
            <v-btn icon @click="v => expand(order, !isExpanded(order))">
              <v-icon>{{ !isExpanded(order) ? 'mdi-chevron-down' : 'mdi-chevron-up' }}</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider></v-divider>

          <v-row v-if="isExpanded(order)">
            <v-col cols="6">
              <v-list dense>
                <v-list-item v-for="row in orderRows(order)" :key="row.text">
                  <v-row>
                    <v-col cols="12" sm="4" md="3">
                      <v-list-item-content>{{ row.text }}</v-list-item-content>
                    </v-col>

                    <v-col cols="12" sm="8" md="9">
                      <v-list-item-content>
                        {{ row.value }}
                      </v-list-item-content>
                    </v-col>
                  </v-row>
                </v-list-item>
              </v-list>
            </v-col>

            <v-col cols="6">
              <PurchasedProductItem
                v-for="product in order.cart.filter(item => item.productType === 'commodity')"
                :key="product._id"
                :product="product"
              />

              <v-card
                v-for="delivery in order.cart.filter(item => item.productType === 'delivery')"
                :key="delivery._id"
                flat
                class="ma-0 pa-0 d-flex flex-column align-center"
              >
                <v-card-title class="mx-4 pa-0 d-block text-center" style="font-size: 14px; font-weight: bold">
                  Delivery
                </v-card-title>

                <v-card-text class="mx-4 px-4 py-0" style="font-size: 14px"> {{ delivery.type }} </v-card-text>

                <v-card-text class="mx-4 px-4 py-0" style="font-size: 14px"> {{ delivery.country }}</v-card-text>

                <v-card-text class="mx-4 px-4 py-0" style="font-size: 14px"> ${{ delivery.price }} </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </template>

      <template v-slot:footer>
        <v-row class="mx-0 my-4" align="center" justify="center">
          <span class="grey--text">Users per page</span>

          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn dark text color="primary" class="ml-2" v-bind="attrs" v-on="on">
                {{ itemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer></v-spacer>

          <span class="mr-4 grey--text"> Page {{ page }} of {{ numberOfPages }} </span>

          <v-btn dark color="orange darken-3" class="mr-1" @click="formerPage">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>

          <v-btn dark color="orange darken-3" class="ml-1" @click="nextPage">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

import Spinner from '@/components/Spinner.vue';
import PurchasedProductItem from '@/components/Shop/PurchasedProductItem.vue';

export default {
  name: 'PurchasedCommodities',
  components: {
    PurchasedProductItem,
    Spinner,
  },
  data() {
    return {
      loading: false,
      itemsPerPage: 5,
      itemsPerPageArray: [5, 10, 15],
      search: '',
      filter: {},
      sortDesc: true,
      page: 1,
      sortBy: { text: 'Created date', prop: 'createdAt' },
      keys: [
        { text: 'Tracking number', prop: 'trackingNumber' },
        { text: 'Status', prop: 'status' },
        { text: 'Number of order', prop: 'numberOfOrder' },
        { text: 'Invoice id', prop: 'invoiceId' },
        { text: 'Created date', prop: 'createdAt' },
      ],
    };
  },
  computed: {
    ...mapState('shop', ['orders']),
    numberOfPages() {
      if(!this.orders.length) return 1;
      return Math.ceil(this.orders.length / this.itemsPerPage);
    },
  },
  methods: {
    orderRows(order) {
      return [
        {
          text: 'Invoice id:',
          value: order.invoiceId,
        },
        {
          text: 'Number of order:',
          value: order.numberOfOrder,
        },
        {
          text: 'Status:',
          value: order.status,
        },
        {
          text: 'Tracking number:',
          value: order.trackingNumber,
        },
        {
          text: 'Created date:',
          value: new Date(order.createdAt).toLocaleDateString(),
        },
      ];
    },
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
    async getOrders() {
      this.loading = true;
      await this.$store.dispatch('shop/GET_ORDERS');
      this.loading = false;
    },
  },
  created() {
    this.getOrders();
  },
};
</script>

