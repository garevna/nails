<template>
  <v-bottom-navigation
      v-model="bottomNav"
      absolute
      shift
      height="auto"
      background-color="#fa0"
      color='#000'
  >
    <v-card flat class="transparent mx-auto" max-width="2400">
      <v-row align="start" justify="center">
        <v-col cols="12" sm="6" md="4" lg="5">
            <v-btn height="80">
              <span>Facebook</span>
              <v-icon large>mdi-facebook</v-icon>
            </v-btn>

            <v-btn height="80">
              <span>LinkedIn</span>
              <v-icon large>mdi-linkedin</v-icon>
            </v-btn>

            <v-btn height="80">
              <span>Instagram</span>
              <v-icon large>mdi-instagram</v-icon>
            </v-btn>

            <v-card-text>
              <h3>32 Brewer rd, Bentligh 3204 VIC</h3>
              <h3>nailsauinfo@gmail.com</h3>
            </v-card-text>
        </v-col>

        <v-col cols="12" sm="6" md="4" lg="2">
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

        <v-col cols="12" sm="6" md="4" lg="2">
          <v-card-text>
            <h3>Courses</h3>
            <v-divider></v-divider>
            <h4>Manicure</h4>
            <h4>Pedicure</h4>
            <h4>Design</h4>
          </v-card-text>
        </v-col>

        <v-col cols="12" sm="6" md="4" lg="3">
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
