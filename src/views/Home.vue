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
            <p>{{ shop }}</p>
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
          <v-card-text class="text-left">
            <p>
              Our courses are suitable for artists of all levels of experience; whether it’s a beginner artist, an
              intermediate artist seeking to expand their qualifications, or a professional artist seeking to learn new
              techniques, our courses can and will provide that which they seek.
            </p>
            <p>
              If you are an experienced beauty and nail artist and you have knowledge you’d like to share, we can
              provide a platform for you to reach a large audience, just follow the link
              <a @click="goToAddCourse">add courses</a>, check T’s&C’s and fill the application
              form.
            </p>
            <p>
              Join our beauty community; it’s interesting, entertaining and worth being proficient in. We are more than
              happy to have you along with us.
            </p>
          </v-card-text>
          <v-card-text class="text-center">
            <v-btn color="buttons" rounded large dark min-width="160" class="yellow-button mr-4 mb-4" @click="scrollTo"
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

<script>
import { mapState } from 'vuex';

export default {
  name: 'Home',
  components: {
    // Carousel:() => import('@/components/courses/Courses.vue'),
    ImageShop: () => import('@/components/svg/ImageShop.vue'),
    ImageCourses: () => import('@/components/svg/ImageCourses.vue'),
    Courses: () => import('@/components/courses/Courses.vue'),
  },
  data: () => ({}),
  computed: {
    ...mapState(['viewportWidth']),
    ...mapState('auth', ['isLogged']),
    ...mapState('home', ['about', 'shop', 'courses']),
    target() {
      const value = this.selector;
      if (!isNaN(value)) return Number(value);
      else return value;
    },
    isMobile() {
      return this.viewportWidth < 600;
    },
  },
  methods: {
    goToRoute(route) {
      this.$router.push({ name: route });
    },
    goToShop() {
      this.$router.push({ name: 'shop', params: { categoryName: 'nail-tools' } });
    },
    goToAddCourse() {
      if (this.isLogged) {
        this.$router.push({ name: 'add-course' });
        return;
      }
      this.$router.push({ name: 'sign-in' });
    },
    scrollTo() {
      const options = {
        duration: 600,
        offset: 0,
        easing: 'easeInOutCubic',
      };
      this.$vuetify.goTo('#scroll-with-options', options);
    },
  },
};
</script>

<style>
p {
  /* text-align: justify; */
  /* color: #ddf; */
  /* letter-spacing: 0.1rem; */
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