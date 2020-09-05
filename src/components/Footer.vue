<template>
  <v-bottom-navigation v-model="bottomNav" absolute shift height="auto" background-color="#fa0" class='footer'>
    <v-card flat class="transparent mx-auto" max-width="2400" width="80%">
      <v-row align="start" justify="end" width="100%">
        <v-col cols="12" sm="6" md="5" lg="5">
          <v-row class='mt-5'>
            <a href="https://www.instagram.com/nailsaustralia" target="_blank" fab width="70" height="70">
              <v-img :src="require('@/assets/images/instagramico.svg')" class='mx-5' width="70" height="70" />
            </a>
            <a href="https://www.instagram.com/nailsaustralia_shop" target="_blank" fab width="70" height="70">
              <v-img :src="require('@/assets/images/instagramico.svg')" class='mx-5' width="70" height="70" />
            </a>
            <a href="https://www.facebook.com/nailsaustralia" target="_blank" fab>
              <v-img :src="require('@/assets/images/facebookico.svg')" class='mx-5' width="70" height="70" />
            </a>
          </v-row>
<v-row class='mt-5'>
          <v-card-text>
            <h2>32 Brewer rd, Bentligh 3204 VIC</h2>
            <a href="mailto:nailsauinfo@gmail.com" class='mail-link'><h3>nailsauinfo@gmail.com</h3></a>
          </v-card-text>
          </v-row>

        </v-col>

        <v-col cols="12" sm="6" md="2" lg="2">
          <v-card-text>
            <h3>Shop</h3>
            <v-divider></v-divider>
            <h4>Nippers</h4>
            <h4>Scissors</h4>
            <h4>Pushers\Curette</h4>
            <h4>Drill bits</h4>
            <h4>Cosmetics</h4>
            <h4>Brushes</h4>
            <h4>Promotions</h4>
          </v-card-text>
        </v-col>

        <v-col cols="12" sm="6" md="2" lg="2">
          <v-card-text>
            <h3>Courses</h3>
            <v-divider></v-divider>
            <h4>Manicure</h4>
            <h4>Pedicure</h4>
            <h4>Design</h4>
          </v-card-text>
        </v-col>

        <v-col cols="12" sm="6" md="3" lg="3">
          <v-card-text>
            <h3>Payment</h3>
            <h3>Delivery</h3>
            <h3>Return</h3>
            <p></p>
            <h3>Add course</h3>
            <h3>Cooperation</h3>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </v-bottom-navigation>
</template>

<style scoped>
.social {

  margin-bottom: 210px;
}
.footer{
  color: #333333
}
.mail-link{
  text-decoration: none;
  color: #333333
}
</style>

<script>
export default {
  name: 'Footer',
  props: [],
  data: () => ({
    bottomNav: null
  })
}
</script>
