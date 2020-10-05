<template>
  <v-container>
    <CourseCardDetail
      :category="onlineCourseById.category"
      :days="onlineCourseById.days"
      :nameOfCourse="onlineCourseById.nameOfCourse"
      :subtitle="onlineCourseById.subtitle"
      :price="onlineCourseById.price"
      :author="onlineCourseById.author"
      :instructor="onlineCourseById.instructor"
      :infoBonus="onlineCourseById.infoBonus"
      :courseSuitable="onlineCourseById.thisCourseIsSuitableFor"
      :description="onlineCourseById.description"
      :dateOfCourses="onlineCourseById.dateOfCourses"
      :url="onlineCourseByIdImg"
      :type="typeCourse"
      :coverImageSrc="coverImageSrc"
        btnTitle="BUY THIS COURSE"
      :btnCallBack="btnCallBack"
    />
  </v-container>
</template>
<style scoped>
</style>
<script>
import { mapState } from 'vuex'
import 'nails-courses-card-detail'
import 'nails-courses-card-detail/dist/nails-courses-card-detail.css'
export default {
  name: 'course-online',
  data () {
    return {
      coverImageSrc: require('@/assets/noImage.jpg'),
      typeCourse: 'online'
    }
  },
  computed: {
    ...mapState('onlineCourses', ['onlineCourseById', 'onlineCourseByIdImg'])
  },
  methods: {
    btnCallBack () {
      this.$router.push({ name: 'personal-data' })
    }
  },
  mounted () {
    this.$store.dispatch('onlineCourses/GET_ONLINE_COURSE_BY_ID', { id: this.$route.params.id })
  },
  beforeDestroy () {
    this.$store.dispatch('onlineCourses/CLEAR_ONLINE_COURSE_BY_ID')
  }
}
</script>
