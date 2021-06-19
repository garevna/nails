<template>
  <div>
    <div v-if="!loading" class="d-flex flex-wrap justify-center">
      <CourseCard v-for="(card, index) in offlineCourses" :key="index" :course="card" type="offline" />
    </div>

    <CardSkeleton v-if="loading" type="offline" />

    <div v-if="emptyCourses" class="empty-courses">No courses ...</div>

    <div class="text-center">
      <v-btn
        v-if="isHideBtn"
        color="buttons"
        rounded
        outlined
        large
        class="yellow-button"
        @click="getMoreCourses"
        >more courses</v-btn
      >
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import CourseCard from '@/components/courses/CourseCard.vue';
import CardSkeleton from '@/components/courses/CardSkeleton.vue';

export default {
  name: 'OfflineCourses',
  components: {
    CourseCard,
    CardSkeleton,
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapState('offlineCourses', ['offlineCourses', 'totalOfflineCourses']),
    isHideBtn() {
      return this.offlineCourses.length < this.totalOfflineCourses;
    },
    emptyCourses() {
      return !this.loading && !this.offlineCourses.length;
    },
  },
  methods: {
    ...mapActions('offlineCourses', {
      getCourses: 'GET_OFFLINE_COURSES',
      getMoreCourses: 'GET_MORE_OFFLINE_COURSES',
    }),
    getMoreCourses() {
      this.getMoreCourses(this.offlineCourses.length);
    },
  },
  async mounted() {
    this.loading = true;
    await this.getCourses();
    this.loading = false;
  },
};
</script>

<style scoped>
.empty-courses {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
</style>