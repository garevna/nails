<template>
  <v-hover v-slot="{ hover }" open-delay="100">
    <v-card dark :elevation="hover ? 16 : 2" :class="{ 'on-hover': hover }" width="400" class="ma-12">
      <CoverImage :url="linkCheck(course)" :height="250"/>
      <v-card-title class="buttons--text pa-0 pl-4 pt-4">
        {{ course.accessDays }} days | $ {{ course.price }}
      </v-card-title>
      <!-- <v-card-title class="pa-0 pl-4"> -->
        <h3 class="pa-0 pl-4 my-2 items-text">{{ course.nameOfCourse }}</h3>
      <!-- </v-card-title> -->
      <!-- <v-card-text class="pa-0 px-4 pb-4 text-start"> -->
        <!-- {{ courseSubtitle }} -->
        <!-- {{ course.subtitle }} -->
       <p class=" pa-0 px-4 items-text spacing">{{ course.subtitle }}</p>
      <!-- </v-card-text> -->
      <v-card-actions v-if="type === 'online'" class="pl-4 pb-4">
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
      <v-card-actions v-else class="pl-4 pb-4">
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

<style scoped>
.items-text {
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
}
.spacing {
  letter-spacing: unset;
}

</style>

<script>
import CoverImage from '@/components/CoverImage.vue';
import checkCourseLink from '@/helpers/checkCourseLink';
export default {
  name: 'course-card',
  props: ['course', 'type'],
  components: {
    CoverImage,
  },
  data() {
    return {};
  },
  computed:{
    // courseName () {
    //   return this.course?.nameOfCourse?.length < 25 ? this.course?.nameOfCourse : this.course?.nameOfCourse?.slice(0,22)+'...'
    // },
    // courseSubtitle() {
    //   return this.course?.subtitle?.length < 50 ? this.course?.subtitle : this.course?.subtitle?.slice(0, 47) + '...';
    // },
  },
  watch: {},
  methods: {
    linkCheck(course) {
      return checkCourseLink(course);
    },
    detailInfo(route) {
      this.$router.push({ name: route, params: { id: this.course._id } });
    },
    payDetail() {
      this.$router.push({ name: 'by-course', params: { courseid: this.course._id } });
    },
  },
};
</script>
