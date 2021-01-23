<template>
  <v-dialog v-model="dialog" scrollable max-width="500px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon color="secondaryGray">mdi-shopping</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="justify-center">Your cart</v-card-title>
      <v-divider></v-divider>
      <v-card-text style="height: 300px"> Your cart is empty... </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="justify-center">
        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
        <v-btn color="blue darken-1" text @click="dialog = false">Buy</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped>
@import '@/css/variables.scss';
</style>

<script>
export default {
  name: 'ProductCart',
  props: [],
  data() {
    return {
      dialog: false,
    };
  },
  watch: {
    dialog() {
      console.log('dialog', this.dialog);
    },
  },
  methods: {},
  mounted() {
    console.log('mounted');
  },
};
</script>
