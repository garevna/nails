<template>
  <v-container>
    <CourseDetail
      v-if="offlineCourseById"
      :course="offlineCourseById"
      type="offline"
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
  name: 'OfflineCourse',
  components: {
    CourseDetail
  },
  data () {
    return {}
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
    this.$store.dispatch('offlineCourses/GET_OFFLINE_COURSE_BY_ID', {
      id: this.$route.params.id
    })
  },
  beforeDestroy () {
    this.$store.dispatch('offlineCourses/CLEAR_OFFLINE_COURSE_BY_ID')
  }
}
</script>
