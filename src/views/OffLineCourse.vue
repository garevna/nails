<template>
  <v-container>
    <CourseDetail
      v-if="offlineCourse"
      :course="offlineCourse"
      type="offline"
      btnTitle="BUY THIS COURSE"
    />
  </v-container>
</template>
<style scoped>
</style>
<script>
import { mapState, mapActions } from 'vuex'

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
    ...mapState('offlineCourses', ['offlineCourse'])
  },
  methods: {
    ...mapActions('offlineCourses',{
      getCourse: 'GET_COURSE'
    }),
    btnCallBack () {
      this.$router.push({ name: 'personal-data' })
    }
  },
  mounted () {
    this.getCourse(this.$route.params.courseid)
  },
  beforeDestroy () {
  }
}
</script>
