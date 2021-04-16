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
          v-for="(course, index) in courses"
          :key="course._id + index"
          :type="type"
          @more="goToCourse(course._id)"
          @lessons="goToLessons(course._id)"
          :course="course"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

import Spinner from '@/components/Spinner.vue';
import PurchasedCourseCard from '@/components/courses/PurchasedCourseCard.vue';
export default {
  name: 'PurchasedCourses',
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
        name: this.type === 'online' ? 'purchased-online-course' : 'purchased-offline-course',
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
  },
  created() {
    this.getCourses();
  },
};
</script>

