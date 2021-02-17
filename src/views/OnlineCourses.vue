<template>
  <div>
    <div class="d-flex flex-wrap justify-center">
      <CourseCard v-for="(card, index) in courses" :key="index" :course="card" type="online" />
    </div>
    <div v-if="hideBtn" class="text-center">
      <v-btn
        color="buttons"
        rounded
        outlined
        small
        dark
        min-width="90"
        class="yellow-button"
        @click="getMore"
        >more courses</v-btn
      >
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>

<script>
import { mapState, mapActions } from 'vuex';

import CourseCard from '@/components/courses/CourseCard.vue';

export default {
  name: 'courses-online',
  components: {
    CourseCard,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState('courses', ['courses', 'total']),
    hideBtn() {
      return this.courses.length < this.total;
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
  mounted() {
    this.getAllCourses();
  },
};
</script>
