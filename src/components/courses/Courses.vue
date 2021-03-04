<template>
  <div>
    <v-card flat tile class="py-12 onlineCardFone">
      <div class="d-flex justify-center">
        <v-btn
          color="buttons"
          rounded
          small
          outlined
          primary
          class="ref d-flex justify-center yellow-button pa-6"
          @click="toOnlineCourses"
          >Online courses</v-btn
        >
      </div>
      <div class="d-flex flex-wrap justify-center">
        <CourseCard
          v-for="(card, index) in courses"
          :key="index"
          :course="card"
          type="online"
          :detailInfo="detailInfo"
          :payDetail="payDetail"
        />
      </div>
      <div v-if="isHideMoreButtonOnline && this.$route.name !== 'home'" class="d-flex justify-center">
        <v-btn
          color="buttons"
          rounded
          small
          outlined
          primary
          class="ref d-flex justify-center yellow-button pa-6"
          @click="getMoreOnlineCourses"
          >more online courses</v-btn
        >
      </div>
    </v-card>
    <v-card flat class="homefone py-12">
      <div class="d-flex justify-center">
        <v-btn
          color="buttons"
          rounded
          outlined
          large
          dark
          class="ref d-flex justify-center yellow-button pa-6"
          @click="toOfflineCourses"
          >Offline courses</v-btn
        >
      </div>
      <div class="d-flex flex-wrap justify-center">
        <CourseCard
          v-for="(card, index) in offlineCourses"
          :key="index"
          :course="card"
          type="offline"
          :detailInfo="detailInfo"
          :payDetail="payDetail"
        />
      </div>
      <div class="d-flex justify-center">
        <v-btn
          color="buttons"
          rounded
          small
          outlined
          primary
          class="ref d-flex justify-center yellow-button pa-6"
          v-if="isHideMoreButtonOnline && this.$route.name !== 'home'"
          @click="getMoreOfflineCourses"
          >more offline courses</v-btn
        >
      </div>
    </v-card>
  </div>
</template>

<style scoped lang="scss">
@import '@/css/variables.scss';
h2 {
  color: white;
}
.ref {
  font-size: 20px !important;
}
.ref:hover {
  cursor: pointer;
  color: #ffc44a;
}
</style>

<script>
import { mapState } from 'vuex';

import CourseCard from '@/components/courses/CourseCard.vue';

export default {
  components: {
    CourseCard,
  },
  data() {
    return {};
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
      // this.$router.push({ name: 'personal-data' })
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
    getCourses() {
      this.$store.dispatch('offlineCourses/GET_OFFLINE_COURSES');
      this.$store.dispatch('courses/GET_ALL_COURSES');
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
