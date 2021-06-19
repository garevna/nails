<template>
  <div>
    <div v-if="!loading" class="d-flex flex-wrap justify-center">
      <CourseCard v-for="(card, index) in courses" :key="index" :course="card" type="online" />
    </div>

    <CardSkeleton v-if="loading" />

    <div v-if="emptyCourses" class="empty-courses">
      No courses ...
    </div>

    <div v-if="hideBtn" class="text-center">
      <v-btn color="buttons" rounded outlined large class="yellow-button" @click="getMore">more courses</v-btn>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import CourseCard from '@/components/courses/CourseCard.vue';
import CardSkeleton from '@/components/courses/CardSkeleton.vue';

export default {
  name: 'OnlineCourses',
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
    ...mapState('courses', ['courses', 'total']),
    hideBtn() {
      return this.courses.length < this.total;
    },
    emptyCourses() {
      return !this.loading && !this.courses.length;
    },
  },
  methods: {
    ...mapActions('courses', {
      getMoreCourses: 'GET_MORE_COURSES',
      getAllCourses: 'GET_ALL_COURSES',
    }),
    getMore() {
      this.getMoreCourses(this.courses.length);
    },
  },
  async mounted() {
    this.loading = true;
    await this.getAllCourses();
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