<template>
  <v-container fluid>
    <v-row class="d-flex justify-center">
      <v-col cols="12" xs="12" v-if="loading">
        <Spinner />
      </v-col>
      <v-col cols="12" xs="12" v-if="!loading && videos" class="d-flex justify-center flex-wrap">
        <PurchasedLessonCard v-for="video in videos" :key="video._id" @lesson="goToLesson(video._id)" :video="video" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

import Spinner from '@/components/Spinner.vue';
import PurchasedLessonCard from '@/components/courses/PurchasedLessonCard.vue';
export default {
  name: 'PurchasedLessons',
  components: {
    PurchasedLessonCard,
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
    hideBtn() {
      return this.courses.length < this.total;
    },
  },
  methods: {
    goToLesson(id) {
      this.$router.push({ name: 'purchased-lesson', params: { lessonid: id } });
    },
    async getCourse() {
      this.loading = true;
      await this.$store.dispatch('purchasedCourses/GET_COURSE', this.$route.params.courseid);
      this.loading = false;
    },
  },
  created() {
    this.getCourse();
  },
};
</script>

