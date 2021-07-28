<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="5">
        <v-card flat class="transparent mx-auto my-auto" max-width="480">
          <v-card-title class="justify-center secondary--text">
            <h2>A B O U T</h2>
          </v-card-title>
          <v-card-text class="text-justify colorParagraph--text">
            <p>{{ about }}</p>
          </v-card-text>
          <v-card v-if="isMobile" flat class="transparent mx-auto my-auto">
            <v-img src="../assets/shop.svg" />
            <!-- <ImageShop /> -->
          </v-card>
          <v-card-title class="justify-center secondary--text">
            <h2>S H O P</h2>
          </v-card-title>
          <v-card-text class="text-justify colorParagraph--text">
            <p>{{ shop }}</p>
          </v-card-text>
          <v-card-text class="text-center">
            <v-btn
              color="buttons"
              rounded
              large
              dark
              min-width="160"
              class="btn-width yellow-button"
              @click="goToShop()"
              >SHOP</v-btn
            >
          </v-card-text>
        </v-card>
      </v-col>
      <v-col v-if="!isMobile" cols="12" sm="7">
        <v-card flat class="transparent mx-auto my-auto" max-width="700">
          <v-img src="../assets/shop.svg" />
          <!-- <ImageShop /> -->
        </v-card>
      </v-col>
      <v-col cols="12" sm="7">
        <v-card flat class="transparent mx-auto my-auto" max-width="700">
          <!-- <ImageCourses /> -->
          <v-img src="../assets/courses.svg" />
        </v-card>
      </v-col>
      <v-col cols="12" sm="5">
        <v-card flat class="transparent mx-auto my-auto" max-width="480">
          <v-card-title class="justify-center secondary--text">
            <h2>C O U R S E S</h2>
          </v-card-title>
          <v-card-text class="text-justify colorParagraph--text">
            <p>
              Our courses are suitable for artists of all levels of experience; whether it’s a beginner artist, an
              intermediate artist seeking to expand their qualifications, or a professional artist seeking to learn new
              techniques, our courses can and will provide that which they seek.
            </p>
            <p>
              If you are an experienced beauty and nail artist and you have knowledge you’d like to share, we can
              provide a platform for you to reach a large audience, just follow the link
              <a @click="goToAddCourse">add courses</a>, check T’s&C’s and fill the application form.
            </p>
            <p>
              Join our beauty community; it’s interesting, entertaining and worth being proficient in. We are more than
              happy to have you along with us.
            </p>
          </v-card-text>
          <v-card-actions class="d-flex flex-column flex-md-row justify-md-center">
            <v-btn
              color="buttons"
              rounded
              large
              min-width="160"
              class="btn-width yellow-button mb-4 mb-md-0"
              @click="scrollTo"
              >ALL COURSES</v-btn
            >
            <v-btn
              v-if="isLogged"
              color="buttons"
              rounded
              outlined
              large
              min-width="160"
              class="btn-width yellow-button ml-0 ml-md-4"
              @click="goToRoute('add-course')"
              >ADD COURSE</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="pa-0">
        <Courses id="scroll-with-options" />
      </v-col>
    </v-row>

    <v-card flat class="transparent">
      <v-card-actions class="d-flex justify-center">
        <v-btn color="buttons" rounded large class="btn-width yellow-button pa-4" @click="goToRoute('courses')"
          >MORE COURSES</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Home',
  components: {
    // Carousel:() => import('@/components/courses/Courses.vue'),
    // ImageShop: () => import('@/components/svg/ImageShop.vue'),
    // ImageCourses: () => import('@/components/svg/ImageCourses.vue'),
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

<style scoped>
.btn-width {
  width: 200px;
}
</style>