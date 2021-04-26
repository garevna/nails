<template>
  <v-card flat tile class="burger-menu" :class="{ 'open-menu': panel }" @click="$emit('update:panel', false)">
    <v-list class="d-flex burgerBg flex-column align-center">
      <v-list-item v-for="(item, i) in list" :key="i" @click="goTo(item.name)">
        <v-list-item-title class="black--text main-menu-items">{{ item.text }}</v-list-item-title>
      </v-list-item>
      <v-list-item v-if="isLogged" class="d-flex justify-center" @click="goTo('user-cabinet')">
        <v-icon color="secondaryGray">mdi-account</v-icon>
      </v-list-item>
      <v-list-item class="py-4">
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
    list() {
      return [
        {
          name: 'home',
          text: 'Home',
          view: true,
        },
        {
          name: 'shop-root',
          text: 'Shop',
          view: true,
        },
        {
          name: 'courses',
          text: 'Courses',
          view: true,
        },
        {
          name: 'sign-in',
          text: 'Sign in',
          view: !this.isLogged,
        },
        {
          name: 'sign-up',
          text: 'Sign up',
          view: !this.isLogged,
        },
      ].filter(item => item.view);
    },
  },
  methods: {
    goTo(name) {
      this.$emit('update:panel', false);
      if (this.$route.name !== name) {
        this.$router.push({ name });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.burger-menu {
  position: fixed;
  top: 100px;
  width: 100%;
  left: 0;
  max-height: 0;
  transition: max-height 0.15s ease-out;
  overflow: hidden;
  cursor: pointer;
}
.open-menu {
  max-height: 500px;
  transition: max-height 0.25s ease-in;
}
.main-menu-items {
  font-size: 18px;
  line-height: 40px;
}
</style>
