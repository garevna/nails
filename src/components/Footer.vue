<template>
  <div class="footer-wrapper" :style="{ backgroundColor: homefone }">
    <v-bottom-navigation v-model="bottomNav" shift height="auto" background-color="#FFC44A" class="footer">
      <v-card flat class="transparent mx-auto" max-width="2400" width="80%">
        <v-row align="start" justify="end" width="100%">
          <v-col cols="12" sm="12" md="5" lg="5">
            <v-row class="mt-5 justify-sm-center justify-center">
              <a href="https://www.instagram.com/nailsaustralia" target="_blank" fab>
                <v-img :src="require('@/assets/images/instagramico.svg')" class="mx-5 icon-social" max-width="70" />
              </a>
              <a href="https://www.instagram.com/nailsaustralia_shop" target="_blank" fab>
                <v-img :src="require('@/assets/images/instagramico.svg')" class="mx-5 icon-social" max-width="70" />
              </a>
              <a href="https://www.facebook.com/nailsaustralia" target="_blank" fab>
                <v-img :src="require('@/assets/images/facebookico.svg')" class="mx-5 icon-social" max-width="70" />
              </a>
            </v-row>
            <v-row class="mt-5 text-sm-center text-center">
              <v-card-text class="justify-sm-center gray-text">
                <h2>32 Brewer rd, Bentligh 3204 VIC</h2>
                <a href="mailto:nailsauinfo@gmail.com" class="mail-link"><h3>nailsauinfo@gmail.com</h3></a>
              </v-card-text>
            </v-row>
          </v-col>

          <v-col cols="6" sm="4" md="2" lg="2">
            <v-card-text class="gray-text no-wrap">
              <h3>Shop</h3>
              <v-divider></v-divider>
              <h4 class="route" @click="goToShopRoute('cuticle-nippers')">Nippers</h4>
              <h4 class="route" @click="goToShopRoute('cuticle-scissors')">Scissors</h4>
              <h4 class="route" @click="goToShopRoute('pushers')">Pushers\Curette</h4>
              <h4 class="route" @click="goToShopRoute('diamond-drill-bits')">Drill bits</h4>
              <h4 class="route" @click="goToShopRoute('cosmetics')">Cosmetics</h4>
              <h4 class="route" @click="goToShopRoute('brushes')">Brushes</h4>
              <h4 class="route" @click="goToShopRoute('promotions')">Promotions</h4>
            </v-card-text>
          </v-col>

          <v-col cols="6" sm="3" md="2" lg="2">
            <v-card-text class="gray-text no-wrap">
              <h3>Courses</h3>
              <v-divider></v-divider>
              <h4>Manicure</h4>
              <h4>Pedicure</h4>
              <h4>Design</h4>
            </v-card-text>
          </v-col>

          <v-col cols="12" sm="5" md="3" lg="3">
            <v-card-text class="gray-text no-wrap">
              <h2 class="route" v-on:click="goToRoute('payment')">Payment</h2>
              <h2 class="route" v-on:click="goToRoute('delivery')">Delivery</h2>
              <h2 class="route" v-on:click="goToRoute('return')">Return</h2>
              <p></p>
              <h2 class="route" v-on:click="goToRoute('add-course')">Add course</h2>
              <h2 class="route" v-on:click="goToRoute('cooperation')">Cooperation</h2>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </v-bottom-navigation>
  </div>
</template>

<style scoped>
.route {
  cursor: pointer;
}
.social {
  margin-bottom: 210px;
}
.gray-text {
  color: #333333 !important;
}
.no-wrap {
  white-space: nowrap;
}
.mail-link {
  text-decoration: none;
  color: #333333 !important;
}
.footer-wrapper {
  padding-bottom: 30px;
  position: absolute;
  width: 100%;
  left: 0;
  right: 0;
}
@media screen and (max-width: 400px) {
  .icon-social {
    width: 53px;
  }
}
</style>

<script>
export default {
  name: 'Footer',
  props: [],
  data: () => ({
    bottomNav: null
  }),
  computed: {
    homefone () {
      return this.$vuetify.theme.themes.light.homefone
    }
  },
  methods: {
    goToShopRoute (route) {
      if (this.$route.params.categoryName !== route) {
        this.$router.push({ name: 'shop', params: { categoryName: route } })
      }
    },
    goToRoute (route) {
      if (this.$route.name !== route) {
        this.$router.push({ name: route })
      }
    }
  }
}
</script>
