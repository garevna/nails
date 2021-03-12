<template>
  <v-card flat tile class="burger-menu" :class="{ 'open-menu': panel }" @click="$emit('update:panel', false)">
    <v-list class="d-flex burgerBg flex-column align-center">
      <v-list-item @click="goTo('home')">
        <v-list-item-title class="black--text main-menu-items">Home</v-list-item-title>
      </v-list-item>
      <v-list-item @click="goTo('shop-root')">
        <v-list-item-title class="black--text main-menu-items">Shop</v-list-item-title>
      </v-list-item>
      <v-list-item @click="goTo('courses')">
        <v-list-item-title class="black--text main-menu-items">Courses</v-list-item-title>
      </v-list-item>
      <v-list-item v-if="!isLogged" @click="goTo('sign-in')">
        <v-list-item-title class="black--text main-menu-items">Sign in</v-list-item-title>
      </v-list-item>
      <v-list-item v-if="!isLogged" @click="goTo('sign-up')">
        <v-list-item-title class="black--text main-menu-items">Sign up</v-list-item-title>
      </v-list-item>
      <v-list-item v-if="isLogged" class="d-flex justify-center" @click="goTo('user-cabinet')">
        <v-icon color="secondaryGray">mdi-account</v-icon>
      </v-list-item>
      <v-list-item class="py-4">
        <!-- <v-icon color="secondaryGray">mdi-shopping</v-icon> -->
        <CartBtn @click="goTo('products-cart')" />
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';

import CartBtn from '@/components/Shop/CartBtn.vue';

export default {
  props: {
    panel: {
      type: Boolean,
      required: true,
    },
  },
  components: { CartBtn },
  data() {
    return {};
  },
  computed: {
    ...mapState('auth', ['isLogged']),
  },
  methods: {
    goTo(name) {
      this.$emit('update:panel', false);
      if (this.$route.name !== name) {
        this.$router.push({ name });
      }
    },
    close(e) {
      console.log(e);
    },
  },
};
</script>

<style scoped lang="scss">
.burger-menu {
  position: fixed;
  top: -500px;
  width: 100%;
  left: 0;
  transition: top ease-in-out 0.5s;
  cursor: pointer;
}
.open-menu {
  top: 90px;
}
.main-menu-items {
  font-size: 18px;
  line-height: 40px;
}
</style>
