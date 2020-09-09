<template>
  <v-container fluid>
    <v-card flat class="transparent mx-auto my-12 text-center" max-width="1440">
      <v-slide-group
        v-if="screen >= 600"
        v-model="model"
        class="pa-4"
        center-active
        show-arrows

      >
        <v-slide-item
          v-for="(image, index) in images"
          :key="index"
          v-slot:default="{ active, toggle }"
        >
          <v-card
            flat
            class="ma-4"
            height="250"
            width="380"
            @click="toggle"
          >
            <v-img :src="image" contain />
            <v-row class="fill-height" align="center" justify="center">
              <v-scale-transition>
                <v-icon
                    v-if="active"
                    color="white"
                    size="48"
                ></v-icon>
              </v-scale-transition>
            </v-row>
          </v-card>
        </v-slide-item>
      </v-slide-group>

      <v-carousel
        v-else
        :continuous="true"
        :show-arrows="false"
        hide-delimiters
        height="280"
        width="100%"
        light
        class="carousel transparent"
      >
        <v-carousel-item
          v-for="(image, index) in images"
          :key="index"
        >
          <v-sheet height="100%" flat tile class="transparent">
            <v-row align="center" justify="center">
              <v-card flat class="ma-4" hover :width="cardWidth" :height="cardHeight" style="position: relative">
            <v-img :src="image" contain />
            <v-row class="fill-height" align="center" justify="center">
              <v-scale-transition>
                <v-icon
                  color="white"
                  size="48"
                ></v-icon>
              </v-scale-transition>
            </v-row>
          </v-card>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </v-card>
  </v-container>
</template>

<style scoped>
.carousel .v-btn__content,
.carousel .mdi::before,
.carousel .mdi-chevron-right::before,
.carousel .v-icon::after {
  color: #fff !important;
}

.theme--light.v-icon {
  color:#fff;
}

.v-carousel__controls {
  z-index: 0 !important;
}
</style>

<script>

import { mapState } from 'vuex'

export default {
  name: 'Slider',
  data: () => ({
    model: 0,
    cardHeight: '240px',
    images: [
      require('@/assets/images/1.png'),
      require('@/assets/images/2.png'),
      require('@/assets/images/3.png'),
      'http://lorempixel.com/200/280/sports',
      'http://lorempixel.com/200/280/animals',
      'http://lorempixel.com/200/280/people',
      'http://lorempixel.com/200/280/nature',
      'http://lorempixel.com/200/280/transport'
    ]
  }),
  computed: {
    ...mapState(['viewportWidth']),
    ...mapState({ screen: 'viewportWidth' }),
    cardWidth () {
      return this.viewportWidth < 600 ? this.viewportWidth - 100 : 376
    }
  }
}
</script>
