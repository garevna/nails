<template>
  <v-container fluid>
    <v-row class="d-flex justify-center">
      <v-col cols="12" xs="12" v-if="loading">
        <Spinner />
      </v-col>
      <v-col cols="12" xs="12" v-if="emptyCourses">
        <h3 align="center">You have no purchased courses</h3>
      </v-col>
      <v-col cols="12" xs="12" v-if="!loading && !emptyCourses" class="d-flex justify-center flex-wrap">
        <PurchasedCourseCard
          v-for="course in courses"
          :key="course._id"
          :type="type"
          @more="goToCourse(course._id)"
          @lessons="goToLessons(course._id)"
          :course="course"
        />
      </v-col>
      <!-- <div v-if="hideBtn" class="d-flex justify-center my-8">
        <v-btn
          color="buttons"
          rounded
          small
          outlined
          primary
          class="ref d-flex justify-center yellow-button pa-6"
          @click="getMoreCourses"
          >more courses</v-btn
        >
      </div> -->
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

import Spinner from '@/components/Spinner.vue';
import PurchasedCourseCard from '@/components/courses/PurchasedCourseCard.vue';
export default {
  name: 'UserCourses',
  components: {
    PurchasedCourseCard,
    Spinner,
  },
  data() {
    return {
      loading: false,
      dialog: false,
      deleteId: null,
    };
  },
  computed: {
    ...mapState('purchasedCourses', ['courses', 'course', 'videos', 'total', 'video']),
    ...mapState('auth', ['user']),
    emptyCourses() {
      return !this.loading && !this.courses.length;
    },
    type() {
      return this.$route.name.includes('online') ? 'online' : 'offline';
    },
    hideBtn() {
      return this.courses.length < this.total;
    },
  },
  methods: {
    goToCourse(id) {
      this.$router.push({
        name: this.type ==='online' ?'purchased-online-course' : 'purchased-offline-course',
        params: {
          courseid: id,
        },
      });
    },
    goToLessons(id) {
      this.$router.push({ name: 'purchased-lessons', params: { courseid: id } });
    },
    async getCourses() {
      this.loading = true;
      await this.$store.dispatch('purchasedCourses/GET_ALL_COURSES', this.type);
      this.loading = false;
    },
    // async getMoreCourses() {
    //   await this.$store.dispatch('courses/GET_MORE_USER_COURSES', this.courses.length);
    // },
  },
  created() {
    this.getCourses();
  },
  mounted() {},
  beforeMount() {},
};
</script>

  <style scoped>
</style>
