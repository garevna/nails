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
      'course'
    ])
  },
  methods: {
    btnCallBack () {
      this.$router.push({ name: 'personal-data' })
    }
  },
  mounted () {
    this.$store.dispatch('courses/GET_COURSE', this.$route.params.courseid)
  },
  beforeDestroy () {
  }
}
</script>
