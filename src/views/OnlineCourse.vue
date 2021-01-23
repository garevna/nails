<template>
  <v-container>
    <CourseDetail
      v-if="course"
      :course="course"
      type="online"
      btnTitle="BUY THIS COURSE"
    />
  </v-container>
</template>
<style scoped>
</style>
<script>
import { mapState } from 'vuex'

import CourseDetail from '@/components/courses/CourseDetail.vue'

export default {
  name: 'OnlineCourse',
  components: {
    CourseDetail
  },
  data () {
    return {}
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
