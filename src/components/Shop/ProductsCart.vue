<template>
<v-dialog v-model="dialog" scrollable max-width="500px">
  <template v-slot:activator="{ on, attrs }">
    <v-btn icon v-bind="attrs" v-on="on">
      <v-badge
        color="green"
        v-model="getCart.length"
        >
          <template v-slot:badge>
            <span>{{getCart.length}}</span>
          </template>
          <v-icon color="secondaryGray">mdi-shopping</v-icon>
      </v-badge>
    </v-btn>
  </template>
  <v-card>
    <v-card-title class="justify-center">Your cart</v-card-title>
    <v-divider style="margin-bottom: 20px">></v-divider>
    <v-card-text style="height: 300px;">
    <span v-if="!getCart.length">Your cart is empty...</span>
    <v-card class="product-item" v-for="item in getCart" :key="item.id"
      elevation="2"
    >
      <div>
       <v-img
         :src="checkUrl(item)"
         height="100px"
         width="100px"
        ></v-img>
      </div>
      <div class="product-item__content">
      <v-card-title class="white--text">
        <p class="">
          {{item.name}}
        </p>
      </v-card-title>
      <v-card-text>
        Price: {{cart.price}} AUD
      </v-card-text>
      </div>
        <v-btn
        class="mx-2"
        fab
        dark
        small
        color="primary"
        @click="deleteCart(item)"
       >
      <v-icon dark>
        mdi-minus
      </v-icon>
    </v-btn>
    </v-card>
    <span v-if="getCart.length" id="total-summ">Total items: {{getCart.length}}. Summ: {{getPrice}} AUD.</span>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="justify-center">
      <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
      <v-btn color="blue darken-1" text @click="dialog = false">Buy</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
</template>

<style lang="scss" scoped>
@import "@/css/variables.scss";
.product-item {
  display: flex;
  padding: 20px 10px 0 10px;
  margin-bottom: 20px;
}
.product-item__content{
  flex-grow: 1;
}
</style>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ProductCart',
  props: [],
  data () {
    return {
      dialog: false
    }
  },
  watch: {
    dialog () {
      console.log('dialog', this.dialog)
    }
  },
  computed: mapGetters({
    getCart: 'productCart/getCart',
    getPrice: 'productCart/getPrice'
  }),
  methods: {
    checkUrl (card) {
      let img
      if (card.previewImage && Array.isArray(card.previewImage) && card.previewImage.length) {
        img = card.previewImage[0].link
      }
      if (!img) {
        img = this.coverImageSrc
      }
      return img
    },
    deleteCart (card) {
      this.$store.dispatch('productCart/DELETE_CART', card)
    }
  },
  created () {
    this.$store.dispatch('productCart/GET_CART_FROM_LOCAL')
  }
}
</script>
