<template>
  <v-card
      :class="[top ? '' : 'main-menu', 'transparent justify-center align-center']"
      :dark='!light'
      flat
      height="80px"
      tile
      justify='center'
      align='center'
  >
    <v-card flat class="transparent text-center">
      <v-btn text @click="goToShopRoute('cuticle-nippers')">
        Nippers
      </v-btn>
      <v-btn text @click="goToShopRoute('cuticle-scissors')">
        Scissors
      </v-btn>
      <v-btn text @click="goToShopRoute('diamond-drill-bits')">
        Drill bits
      </v-btn>
      <v-btn text @click="goToShopRoute('pushers')">
        Pushers\Curette
      </v-btn>
      <v-btn text @click="goToShopRoute('brushes')">
        Brushes
      </v-btn>
      <v-btn text @click="goToShopRoute('cosmetics')">
        Cosmetics
      </v-btn>
      <v-btn text @click="goToShopRoute('promotions')">
        Promotions
      </v-btn>
    </v-card>
  </v-card>
</template>
  <style scoped>
    .main-menu {
      display:flex;
      margin-top:80px;
      justify-content:center;
    }
    .shop-menu{
      display:flex;
      justify-content:center;
      align-items: center;
    }
  </style>

<script>
export default {
  name: 'MainMenu',
  props: ['light', 'top'],
  methods: {
    goToShopRoute (route) {
      if (this.$route.params.categoryName !== route) {
        this.$router.push({ name: 'shop', params: { categoryName: route } })
      }
    }
  }
}
</script>
