<template>
  <v-container fluid style="padding: 0; margin: 0">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="5">
        <v-card flat class="transparent mx-auto my-auto" max-width="480">
          <v-card-text class="text-center secondary--text">
            <h2>ABOUT</h2>
          </v-card-text>
          <v-card-text class="text-center">
            <p>{{ about }}</p>
          </v-card-text>
          <v-card v-if="isMobile" flat class="transparent mx-auto my-auto">
            <ImageShop />
          </v-card>
          <v-card-text class="text-center secondary--text">
            <h2>S H O P</h2>
          </v-card-text>
          <v-card-text class="text-center">
            <p>{{ shopText }}</p>
          </v-card-text>
          <v-card-text class="text-center">
            <v-btn color="buttons" rounded large dark min-width="160" class="yellow-button" @click="goToShop()"
              >SHOP</v-btn
            >
          </v-card-text>
        </v-card>
      </v-col>
      <v-col v-if="!isMobile" cols="12" sm="7">
        <v-card flat class="transparent mx-auto my-auto" max-width="700">
          <ImageShop />
        </v-card>
      </v-col>
      <v-col cols="12" sm="7">
        <v-card flat class="transparent mx-auto my-auto" max-width="700">
          <ImageCourses />
        </v-card>
      </v-col>
      <v-col cols="12" sm="5">
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
              >ALL COURSES</v-btn
            >
            <v-btn
              v-if="isLogged"
              color="buttons"
              rounded
              outlined
              large
              dark
              min-width="160"
              class="yellow-button mr-4 mb-4"
              @click="goToRoute('add-course')"
              >ADD COURSE</v-btn
            >
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" class="my-16">
          <Carousel />
      </v-col>
      <v-col cols="12" class="pa-0">
        <Courses id="scroll-with-options" />
      </v-col>
      <v-col cols="12" class="d-flex justify-center">
        <v-btn
          color="buttons"
          rounded
          large
          dark
          min-width="160"
          class="yellow-button mr-4 mb-4"
          @click="goToRoute('courses')"
          >MORE COURSES...</v-btn
        >
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
import { mapState } from 'vuex';

// import ImageShop from '@/components/svg/ImageShop.vue';
// import ImageCourses from '@/components/svg/ImageCourses.vue';
import Carousel from '@/components/Carousel.vue';
import Courses from '@/components/courses/Courses.vue';
import ImageCourses from '@/components/svg/ImageCourses.vue'

export default {
  name: 'Home',
  components: {
    Carousel,
    ImageShop:() => import('@/components/svg/ImageShop.vue'),
    ImageCourses,
    Courses,
  },
  data: () => ({
    selector: '#scroll-with-options',
  }),
  computed: {
    ...mapState(['viewportWidth']),
    ...mapState('auth', ['isLogged']),
    ...mapState('home', ['about', 'shop', 'shopText', 'courses']),
    target() {
      const value = this.selector;
      if (!isNaN(value)) return Number(value);
      else return value;
    },
    options() {
      return {
        duration: 300,
        offset: 0,
        easing: 'easeInOutCubic',
      };
    },
    isMobile() {
      return this.viewportWidth < 600;
    }
  },
  methods: {
    goToRoute(route) {
      this.$router.push({ name: route });
    },
    goToShop() {
      this.$router.push({ name: 'shop', params: { categoryName: 'nail-tools' } });
    },
  },
};
</script>
