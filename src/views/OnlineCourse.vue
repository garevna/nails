<template>
  <v-container>
    <CourseCardDetail
      v-if="course"
      :category="course.category"
      :days="course.days"
      :nameOfCourse="course.nameOfCourse"
      :subtitle="course.subtitle"
      :price="course.price"
      :author="course.author"
      :instructor="course.instructor"
      :infoBonus="course.infoBonus"
      :courseSuitable="course.thisCourseIsSuitableFor"
      :description="course.description"
      :dateOfCourses="course.dateOfCourses"
      :url="course.photo[0].link"
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
    ...mapState('courses', [
      // 'courses',
      'course'
      // 'videos',
      // 'video'
    ])
    // ...mapState('onlineCourses', ['onlineCourseById', 'onlineCourseByIdImg'])
  },
  methods: {
    btnCallBack () {
      this.$router.push({ name: 'personal-data' })
    }
  },
  mounted () {
    this.$store.dispatch('courses/GET_COURSE', this.$route.params.id)

    // this.$store.dispatch('onlineCourses/GET_ONLINE_COURSE_BY_ID', { id: this.$route.params.id })
  },
  beforeDestroy () {
    // this.$store.dispatch('onlineCourses/CLEAR_ONLINE_COURSE_BY_ID')
  }
}
</script>
