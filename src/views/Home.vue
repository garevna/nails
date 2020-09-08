<template>
  <v-container fluid style="padding: 0; margin: 0">
    <!-- <MainMenu /> -->
    <!-- <v-card flat dark class="transparent mx-auto" max-width="1440"> -->
    <v-row align="center" justify="center">
      <v-col cols="12" sm="5" order="2">
        <v-card flat class="transparent mx-auto my-auto" max-width="480">
          <v-card-text class="text-center secondary--text">
            <h2>ABOUT</h2>
          </v-card-text>
          <v-card-text class="text-center">
            <p>{{ about }}</p>
          </v-card-text>
          <v-card-text class="text-center secondary--text">
            <h2>S H O P</h2>
          </v-card-text>
          <v-card-text class="text-center">
            <p>{{ shopText }}</p>
          </v-card-text>
          <v-card-text class="text-center">
            <v-btn color="buttons" rounded large dark min-width="160" class="yellow-button">SHOP</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="7" order="1" order-sm="2">
        <v-card flat class="transparent mx-auto my-auto" max-width="700">
          <v-img :src="require('@/assets/images/image-1.png')" />
        </v-card>
      </v-col>
      <v-col cols="12" sm="7" order="2">
        <v-card flat class="transparent mx-auto my-auto" max-width="700">
          <v-img :src="require('@/assets/images/image-2.png')" />
        </v-card>
      </v-col>
      <v-col cols="12" sm="5" order="2">
        <v-card flat class="transparent mx-auto my-auto" max-width="480">
          <v-card-text class="text-center secondary--text">
            <h2>C O U R S E S</h2>
          </v-card-text>
          <v-card-text class="text-center">
            <p>{{ courses }}</p>
          </v-card-text>
          <v-card-text class="text-center">
            <v-btn
              color="buttons"
              rounded
              large
              dark
              min-width="160"
              class="yellow-button mr-4 mb-4"
              @click="$vuetify.goTo(target, options)"
            >ALL COURSES</v-btn>
            <v-btn
              color="buttons"
              rounded
              outlined
              large
              dark
              min-width="160"
              class="yellow-button mr-4 mb-4"
              @click="addCourseHandler"
            >ADD COURSE</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" order="2">
        <v-card flat class="transparent mx-auto my-10" max-width="1360">
          <Carousel />
        </v-card>
      </v-col>
      <v-col cols="12" order="2">
        <v-row>
           <Courses offlineLimit="2" onlineLimit="2" id="scroll-with-options" />
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
p {
  text-align: justify;
  color: #ddf;
  letter-spacing: 0.1rem;
}
.yellow-button {
  color: #000 !important;
  font-weight: bold;
  font-size: 16px !important;
}
.text-center h2 {
  font-size: 28px;
}
</style>

<script>
import { mapState } from 'vuex'

import Carousel from '@/components/Carousel.vue'
// import MainMenu from '@/components/MainMenu.vue'
import Courses from '@/components/Courses/Courses.vue'

export default {
  name: 'Home',
  components: {
    Carousel,
    // MainMenu,
    Courses
  },
  data: () => ({
    selector: '#scroll-with-options'
    // REVIEW: are these lines needed?
    // aboutText: [...Array(100)].map(i => (String.fromCharCode(Math.max(Math.floor(Math.random() * 122), 32)))).join(''),
    // coursesText: [...Array(100)].map(i => (String.fromCharCode(Math.max(Math.floor(Math.random() * 122), 32)))).join('')
  }),
  computed: {
    // INFO: 'shop' no used
    ...mapState('home', ['about', 'shop', 'shopText', 'courses']),
    target () {
      const value = this.selector
      if (!isNaN(value)) return Number(value)
      else return value
    },
    options () {
      return {
        duration: 300,
        offset: 0,
        easing: 'easeInOutCubic'
      }
    }
  },
  methods: {
    addCourseHandler () {
      this.$router.push({ name: 'add-course' })
    },
    toAllCourses () {
      this.$router.push({ name: 'courses' })
    }
  }
}
</script>
