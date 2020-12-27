<template>
  <v-card @click="goToCourse(course._id)" width="500" height="400" class="ma-4">
    <v-card-title class="d-flex justify-center py-4" style="position: relative"
      ><h2>{{ course.nameOfCourse }}</h2>
      <div v-if="!course.isPaid" class="figure1">
        <h5 class="figure-text1">not paid</h5>
      </div>
      <div v-if="!course.isPublished" class="figure2">
        <h5 class="figure-text2">not published</h5>
      </div></v-card-title
    >
    <CoverImage :url="linkCheck(course)" :height="250" />
    <v-card-actions class="d-flex justify-end">
      <v-btn
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
</template>

<script>
import CoverImage from '@/components/CoverImage.vue'
import checkCourseLink from '@/helpers/checkCourseLink'
export default {
  props: ['goToCourse', 'course', 'removeCourse'],
  name: 'UserCourseCard',
  components: {
    CoverImage
  },
  data () {
    return {}
  },
  methods: {
    linkCheck (course) {
      return checkCourseLink(course)
    }
  }
}
</script>

<style scoped>
.figure1 {
  position: absolute;
  border: 20px solid #cc5c5c;
  width: 160px;
  border-right: 30px solid transparent;
  bottom: -20px;
  left: 0;
  z-index: 1;
}
.figure-text1 {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
}
.figure2 {
  position: absolute;
  border: 20px solid #5c5ccc;
  width: 160px;
  border-left: 30px solid transparent;
  bottom: -20px;
  right: 0;
  z-index: 1;
}
.figure-text2 {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
}
</style>
