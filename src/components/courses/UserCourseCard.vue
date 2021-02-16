<template>
  <v-hover v-slot="{ hover }" open-delay="100">
    <v-card
      :elevation="hover ? 16 : 2"
      :class="{ 'on-hover': hover }"
      @click="goToCourse(course._id)"
      width="500"
      height="400"
      class="ma-4"
    >
      <v-card-title class="d-flex justify-center py-4">
        <!-- <h2>{{ course.nameOfCourse }}</h2> -->
        <h2>{{ courseName }}</h2>
      </v-card-title>
      <CoverImage :url="linkCheck(course)" :height="250" />
      <v-card-actions class="d-flex pa-4">
        <v-chip v-if="!course.isPaid" class="ma-2" color="notPaidAndPublished" text-color="white"> not paid </v-chip>
        <v-chip v-if="!course.isPublished" class="ma-2" color="notPaidAndPublished" text-color="white">
          not published
        </v-chip>
        <v-spacer />
        <v-btn
          v-if="published"
          rounded
          color="buttons"
          large
          min-width="160"
          class="yellow-button"
          @click.stop="removeCourse(course._id)"
          >Delete</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<script>
import CoverImage from '@/components/CoverImage.vue';
import checkCourseLink from '@/helpers/checkCourseLink';
export default {
  props: ['goToCourse', 'course', 'removeCourse'],
  name: 'UserCourseCard',
  components: {
    CoverImage,
  },
  data() {
    return {};
  },
  computed: {
    courseName() {
      return this.course.nameOfCourse.length < 20 ? this.course.nameOfCourse : this.course.nameOfCourse.slice(0, 17) + '...';
    },
    published() {
      return !this?.course?.isPublished
    }
  },
  methods: {
    linkCheck(course) {
      return checkCourseLink(course);
    },
  },
};
</script>

<style scoped>
</style>
