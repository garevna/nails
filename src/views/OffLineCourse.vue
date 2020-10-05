<template>
  <v-container>
    <CourseCardDetail
      :category="offlineCourseById.category"
      :days="offlineCourseById.days"
      :nameOfCourse="offlineCourseById.nameOfCourse"
      :subtitle="offlineCourseById.subtitle"
      :price="offlineCourseById.price"
      :author="offlineCourseById.author"
      :instructor="offlineCourseById.instructor"
      :infoBonus="offlineCourseById.infoBonus"
      :courseSuitable="offlineCourseById.thisCourseIsSuitableFor"
      :description="offlineCourseById.description"
      :dateOfCourses="offlineCourseById.dateOfCourses"
      :url="offlineCourseByIdImg"
      :type="typeCourse"
      :coverImageSrc="coverImageSrc"
        btnTitle="APPLY"
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
  name: 'course-offline',
  data () {
    return {
      coverImageSrc: require('@/assets/noImage.jpg'),
      typeCourse: 'offline'
    }
  },
  computed: {
    ...mapState('offlineCourses', ['offlineCourseById', 'offlineCourseByIdImg'])
  },
  methods: {
    btnCallBack () {
      this.$router.push({ name: 'personal-data' })
    }
  },
  mounted () {
    this.$store.dispatch('offlineCourses/GET_OFFLINE_COURSE_BY_ID', { id: this.$route.params.id })
  },
  beforeDestroy () {
    this.$store.dispatch('offlineCourses/CLEAR_OFFLINE_COURSE_BY_ID')
  }
}
</script>
