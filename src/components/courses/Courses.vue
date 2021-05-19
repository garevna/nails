<template>
  <div>
    <v-card flat tile class="py-12 onlineCardFone">
      <v-card-actions class="d-flex justify-center">
        <v-btn
          color="buttons"
          rounded
          small
          outlined
          primary
          class="yellow-button pa-6"
          @click="toOnlineCourses"
          >Online courses</v-btn
        >
      </v-card-actions>
      <div v-if="!loading" class="d-flex flex-wrap justify-center">
        <CourseCard
          v-for="(card, index) in courses"
          :key="index"
          :course="card"
          type="online"
          :detailInfo="detailInfo"
          :payDetail="payDetail"
        />
      </div>

      <CardSkeleton v-if="loading" />

      <v-card-actions v-if="isHideMoreButtonOnline && this.$route.name !== 'home'" class="d-flex justify-center">
        <v-btn
          color="buttons"
          rounded
          small
          outlined
          primary
          class="yellow-button pa-6"
          @click="getMoreOnlineCourses"
          >more online courses</v-btn
        >
      </v-card-actions>
    </v-card>

    <v-card flat class="homefone py-12">
      <v-card-actions class="d-flex justify-center">
        <v-btn
          color="buttons"
          rounded
          outlined
          large
          dark
          class="yellow-button pa-6"
          @click="toOfflineCourses"
          >Offline courses</v-btn
        >
      </v-card-actions>

      <div v-if="!loading" class="d-flex flex-wrap justify-center">
        <CourseCard
          v-for="(card, index) in offlineCourses"
          :key="index"
          :course="card"
          type="offline"
          :detailInfo="detailInfo"
          :payDetail="payDetail"
        />
      </div>

      <CardSkeleton v-if="loading" type="offline" />

      <v-card-actions class="d-flex justify-center">
        <v-btn
          color="buttons"
          rounded
          small
          outlined
          primary
          class="yellow-button pa-6 text-h6 font-weight-black"
          v-if="isHideMoreButtonOnline && this.$route.name !== 'home'"
          @click="getMoreOfflineCourses"
          >more offline courses</v-btn
        >
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import CourseCard from '@/components/courses/CourseCard.vue';
import CardSkeleton from '@/components/courses/CardSkeleton.vue';

export default {
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
    ...mapState('courses', ['courses', 'total']),
    isHideMoreButtonOnline() {
      return this.courses.length < this.total;
    },
    isHideMoreButtonOffline() {
      return this.offlineCourses.length < this.totalOfflineCourses;
    },
  },
  methods: {
    detailInfo(route, id) {
      this.$router.push({ name: route, params: { courseid: id } });
    },
    payDetail(type, id) {
      this.$router.push({
        name: type === 'online' ? 'by-course' : 'by-offline',
        params: {
          courseid: id,
        },
      });
    },
    toOfflineCourses() {
      this.$router.push({ name: 'courses-offline' });
    },
    toOnlineCourses() {
      this.$router.push({ name: 'courses-online' });
    },
    async getCourses() {
      this.loading = true;
      await this.$store.dispatch('offlineCourses/GET_OFFLINE_COURSES');
      await this.$store.dispatch('courses/GET_ALL_COURSES');
      this.loading = false;
    },
    getMoreOnlineCourses() {
      this.$store.dispatch('courses/GET_MORE_COURSES', this.courses.length);
    },
    getMoreOfflineCourses() {
      this.$store.dispatch('offlineCourses/GET_MORE_OFFLINE_COURSES', this.offlineCourses.length);
    },
  },
  mounted() {
    this.getCourses();
  },
};
</script>