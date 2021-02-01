<template>
  <div>
    <div class="d-flex flex-wrap justify-center">
      <CourseCard
        v-for="(card, index) in offlineCourses"
        :key="index"
        :course="card"
        type="offline"
      />
    </div>
    <div class="text-center">
      <v-btn
        color="buttons"
        rounded
        outlined
        small
        dark
        min-width="90"
        class="yellow-button"
        v-if="isHideMoreButtonOffline"
        @click="getMoreOfflineCourses"
        >more courses</v-btn
      >
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>

<script>
import { mapActions, mapState } from 'vuex';

import CourseCard from '@/components/courses/CourseCard.vue';

export default {
  name: 'OfflineCourses',
  components: {
    CourseCard,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState('offlineCourses', ['offlineCourses', 'totalOfflineCourses']),
    isHideMoreButtonOffline() {
      return this.offlineCourses.length < this.totalOfflineCourses;
    },
  },
  methods: {
    ...mapActions('offlineCourses', {
      getCourses: 'GET_OFFLINE_COURSES',
      getMoreCourses: 'GET_MORE_OFFLINE_COURSES',
    }),
    getMoreOfflineCourses() {
      this.getMoreCourses(this.offlineCourses.length);
    },
  },
  mounted() {
    this.getCourses();
  },
};
</script>
