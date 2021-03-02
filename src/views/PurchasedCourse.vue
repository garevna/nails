<template>
  <v-container fluid>
    <v-row class="d-flex justify-center">
      <v-col cols="12" xs="12" v-if="loading">
        <Spinner />
      </v-col>
      <v-col cols="12" xs="12" v-if="!loading && course" class="d-flex justify-center flex-wrap">
        <PurchasedCourseDetail
          :type="type"
          :course="course"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

import Spinner from '@/components/Spinner.vue';
import PurchasedCourseDetail from '@/components/courses/PurchasedCourseDetail.vue';
export default {
  name: 'UserCourses',
  components: {
    PurchasedCourseDetail,
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
      return this.$route.name.includes('online') ? 'online' : 'offline'
    },
    hideBtn() {
      return this.courses.length < this.total;
    },
  },
  methods: {
    async getCourse() {
      this.loading = true;
      if (this.type === 'online') {
        await this.$store.dispatch('purchasedCourses/GET_COURSE',this.$route.params.courseid);
      }else {
        await this.$store.dispatch('purchasedCourses/GET_OFFLINE_COURSE',this.$route.params.courseid);
      }
       
      this.loading = false;
    },
  },
  created() {
    this.getCourse();
  },
  mounted() {},
  beforeMount() {},
};
</script>

  <style scoped>
  </style>
