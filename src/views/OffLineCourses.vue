<template>
  <div>
    <div v-if="!loading" class="d-flex flex-wrap justify-center">
      <CourseCard v-for="(card, index) in offlineCourses" :key="index" :course="card" type="offline" />
    </div>

    <CardSkeleton v-if="loading" type="offline" />

    <div class="text-center">
      <v-btn
        v-if="isHideMoreButtonOffline"
        color="buttons"
        rounded
        outlined
        large
        class="yellow-button"
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
  async mounted() {
    this.loading = true;
    await this.getCourses();
    this.loading = false;
  },
};
</script>
