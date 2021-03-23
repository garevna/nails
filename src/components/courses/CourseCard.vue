<template>
  <v-hover v-slot="{ hover }" open-delay="100">
    <v-card dark :elevation="hover ? 16 : 2" :class="{ 'on-hover': hover }" :width="width" class="ma-12">
      <CoverImage :url="linkCheck(course)" />
      <v-card-title class="buttons--text px-4">
        {{ course.accessDays }} days | $ {{ course.price }}
      </v-card-title>
      <h3 class="px-4 pb-4 text-truncate">{{ course.nameOfCourse }}</h3>
      <p class="px-4 text-truncate spacing">{{ course.subtitle }}</p>
      <v-card-actions v-if="type === 'online'" class="pa-4">
        <v-btn
          color="buttons"
          rounded
          small
          outlined
          primary
          min-width="90"
          class="yellow-button mr-4"
          @click="payDetail"
          >pay</v-btn
        >
        <v-btn
          color="buttons"
          rounded
          small
          min-width="90"
          dark
          class="yellow-button"
          @click="detailInfo('course-online')"
          >more</v-btn
        >
      </v-card-actions>
      <v-card-actions v-else class="pa-4">
        <v-btn
          color="buttons"
          rounded
          outlined
          small
          dark
          min-width="90"
          class="yellow-button"
          @click="detailInfo('course-offline')"
          >more</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<script>
import { mapState } from 'vuex';

import CoverImage from '@/components/CoverImage.vue';
import checkCourseLink from '@/helpers/checkCourseLink';
export default {
  name: 'CourseCard',
  props: {
    course: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    preview: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: '300',
    },
  },
  components: {
    CoverImage,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState('auth', ['user']),
  },
  watch: {},
  methods: {
    linkCheck(course) {
      return checkCourseLink(course);
    },
    detailInfo(route) {
      if (this.preview) return;
      this.$router.push({ name: route, params: { courseid: this.course._id } });
    },
    payDetail() {
      if (this.preview) return;
      if (!this.user) {
        this.$router.push({ name: 'sign-in' });
        return;
      }
      this.$router.push({ name: 'by-course', params: { courseid: this.course._id } });
    },
  },
};
</script>

<style scoped>
.spacing {
  letter-spacing: unset;
}
</style>