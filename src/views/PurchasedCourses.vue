<template>
  <v-container fluid>
    <v-row class="d-flex justify-center">
      <v-col cols="12" xs="12" v-if="loading">
        <Spinner />
      </v-col>
      <v-col cols="12" xs="12" v-if="emptyCourses">
        <h3 align="center">You have no purchased courses</h3>
      </v-col>
      <v-col
        cols="12"
        xs="12"
        v-if="!loading && !emptyCourses && type === 'offline'"
        class="d-flex justify-center flex-wrap"
      >
        <div v-if="!opened">
          <PurchasedCourseCard
            v-for="(course, index) in courses"
            :key="course._id + index"
            :type="type"
            @more="openDetail(course._id, true)"
            :course="course"
          />
        </div>
        <PurchasedOfflineDetail :opened.sync="opened" :course="chooseOffline" />
      </v-col>
      <v-col
        cols="12"
        xs="12"
        v-if="!loading && !emptyCourses && type === 'online'"
        class="d-flex justify-center flex-wrap"
      >
        <PurchasedCourseCard
          v-for="(course, index) in courses"
          :key="course.product[0].product._id + index"
          :type="type"
          @more="goToCourse(course.product[0].product._id)"
          @lessons="goToLessons(course.product[0].product._id)"
          :course="course.product[0].product"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

import Spinner from '@/components/Spinner.vue';
import PurchasedCourseCard from '@/components/courses/PurchasedCourseCard.vue';
import PurchasedOfflineDetail from '@/components/courses/PurchasedOfflineDetail.vue';
export default {
  name: 'PurchasedCourses',
  components: {
    PurchasedCourseCard,
    Spinner,
    PurchasedOfflineDetail,
  },
  data() {
    return {
      dialog: false,
      deleteId: null,
      offlineId: null,
      opened: false,
    };
  },
  computed: {
    ...mapState('purchasedCourses', ['courses', 'course', 'videos', 'total', 'video', 'loading']),
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
    chooseOffline() {
      return this.courses.find(course => course._id === this.offlineId) ?? {};
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
    getCourses() {
      this.$store.dispatch('purchasedCourses/GET_ALL_COURSES', this.type);
    },
    openDetail(id, open) {
      (this.offlineId = id), (this.opened = open);
    },
  },
  created() {
    this.getCourses();
  },
};
</script>

