<template>
  <div class="footer-wrapper homefone">
    <v-bottom-navigation fixed v-model="bottomNav" shift height="auto" background-color="#FFC44A" class="footer pb-8">
      <v-card flat class="transparent mx-auto" max-width="2400" width="80%">
        <v-row align="start" justify="end" width="100%">
          <v-col cols="12" sm="12" md="5" lg="5">
            <v-row class="mt-5 justify-center justify-md-start pl-md-5">
              <a href="https://www.instagram.com/nailsaustralia" target="_blank" fab class="social-icon">
                <IconInstagram />
              </a>

              <a href="https://www.instagram.com/nailsaustralia_shop" target="_blank" fab class="social-icon">
                <IconInstagram />
              </a>
              <a href="https://www.facebook.com/nailsaustralia" target="_blank" fab class="social-icon">
                <IconFacebook />
              </a>
            </v-row>
            <v-row class="mt-5 text-center text-md-left">
              <v-card-text class="justify-sm-center darkGrey--text pa-2 pa-sm-4">
                <h2>32 Brewer rd, Bentligh 3204 VIC</h2>
                <a href="mailto:nailsauinfo@gmail.com" class="darkGrey--text">
                  <h3 class="gmail">nailsauinfo@gmail.com</h3>
                </a>
              </v-card-text>
            </v-row>
          </v-col>

          <v-col cols="6" sm="4" md="2" lg="2">
            <v-card-text class="darkGrey--text no-wrap text-center text-sm-left pa-2 pa-sm-4">
              <h3 class="mb-2">Shop</h3>
              <!-- <v-divider></v-divider> -->
              <h4 class="route mb-1 mb-sm-0" @click="goToShopRoute('cuticle-nippers')">Nippers</h4>
              <h4 class="route mb-1 mb-sm-0" @click="goToShopRoute('cuticle-scissors')">Scissors</h4>
              <h4 class="route mb-1 mb-sm-0" @click="goToShopRoute('pushers')">Pushers\Curette</h4>
              <h4 class="route mb-1 mb-sm-0" @click="goToShopRoute('diamond-drill-bits')">Drill bits</h4>
              <h4 class="route mb-1 mb-sm-0" @click="goToShopRoute('cosmetics')">Cosmetics</h4>
              <h4 class="route mb-1 mb-sm-0" @click="goToShopRoute('brushes')">Brushes</h4>
              <h4 class="route mb-1 mb-sm-0" @click="goToShopRoute('promotions')">Promotions</h4>
            </v-card-text>
          </v-col>

          <v-col cols="6" sm="3" md="2" lg="2">
            <v-card-text class="darkGrey--text no-wrap text-center text-sm-left pa-2 pa-sm-4">
              <h3 class="route mb-2">Courses</h3>
              <!-- <v-divider></v-divider> -->
              <h4 class="route mb-1 mb-sm-0" v-on:click="goToRoute('courses')">Manicure</h4>
              <h4 class="route mb-1 mb-sm-0" v-on:click="goToRoute('courses')">Pedicure</h4>
              <h4 class="route mb-1 mb-sm-0" v-on:click="goToRoute('courses')">Design</h4>
            </v-card-text>
          </v-col>

          <v-col cols="12" sm="5" md="3" lg="3">
            <v-card-text class="darkGrey--text no-wrap text-center text-sm-left pt-0 pb-2 py-sm-4">
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
      <div class="py-4 homefone" style="position: absolute; bottom: 0; right:0; left:0;"></div>
    </v-bottom-navigation>
  </div>
</template>

<script>
import IconInstagram from '@/components/svg/IconInstagram.vue';
import IconFacebook from '@/components/svg/IconFacebook.vue';
export default {
  name: 'Footer',
  props: [],
  components: {
    IconInstagram,
    IconFacebook,
  },
  data: () => ({
    bottomNav: null,
  }),
  computed: {
    // homefone () {
    //   return this.$vuetify.theme.themes.light.homefone
    // }
  },
  methods: {
    goToShopRoute(route) {
      if (this.$route.params.categoryName !== route) {
        this.$router.push({ name: 'shop', params: { categoryName: route } });
      }
    },
    goToRoute(route) {
      if (this.$route.name !== route) {
        this.$router.push({ name: route });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.route {
  cursor: pointer;
}
.social-icon {
  width: 70px;
  height: 70px;
}
.social-icon:not(:last-child) {
  margin-right: 25px;
}
.social {
  margin-bottom: 210px;
}
// .gray-text {
//   color: #333333 !important;
// }
.no-wrap {
  white-space: nowrap;
}
// .mail-link {
//   text-decoration: none;
//   color: #333333 !important;
// }
.footer-wrapper{
  height: 289px;
}
// .footer-wrapper {
//   padding-bottom: 30px;
//   position: absolute;
//   width: 100%;
//   left: 0;
//   right: 0;
// }
.gmail{
  font-size: 26px;
}
@media screen and (max-width: 960px) {
  .v-item-group.v-bottom-navigation--fixed{
    position: relative;
  }
}
@media screen and (max-width: 600px) {
  // .right-block {
  //   text-align: center;
  // }
  .links-block {
    font-size: 120%;
    // text-align: center;
  }
  .social-icon {
    width: 53px;
    height: 53px;
  }
  .text-center h2, .gmail{
    font-size: 20px;
  }
  h2.route{
    font-size: 18px;
  }
}
</style>
