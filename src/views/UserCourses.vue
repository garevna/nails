<template>
  <v-container fluid>
    <v-row class="d-flex justify-center">
      <v-col cols="12" xs="12" v-if="loading">
        <Spinner />
      </v-col>
      <v-col cols="12" xs="12" v-if="emptyCourses">
        <h3 align="center">You don't have courses yet</h3>
      </v-col>
      <v-col cols="12" xs="12" v-if="!loading && !emptyCourses" class="d-flex justify-center flex-wrap">
        <UserCourseCard
          v-for="course in courses"
          :key="course._id"
          :goToCourse="goToCourse"
          :course="course"
          :removeCourse="removeCourse"
        />
      </v-col>
      <DeletePopup
        :cancelHandler="cancelHandler"
        :deleteHandler="deleteCourse"
        name="course"
        :dialog="dialog"
      />
    </v-row>
  </v-container>
</template>
<style scoped>
</style>
<script>
import { mapState } from 'vuex'

import Spinner from '@/components/Spinner.vue'
import UserCourseCard from '@/components/courses/UserCourseCard.vue'
import DeletePopup from '@/components/popups/DeletePopup.vue'
export default {
  name: 'UserCourses',
  components: {
    DeletePopup,
    UserCourseCard,
    Spinner
  },
  data () {
    return {
      loading: false,
      dialog: false,
      deleteId: null,
    }
  },
  computed: {
    ...mapState('courses', ['courses', 'course', 'videos', 'video']),
    ...mapState('auth', ['user']),
    emptyCourses () {
      return !this.loading && !this.courses.length
    }
  },
  methods: {
    cancelHandler () {
      this.dialog = false
      this.deleteId = null
    },
    removeCourse (id) {
      this.dialog = true
      this.deleteId = id
    },
    async deleteCourse () {
      await this.$store.dispatch('courses/DELETE_COURSE', this.deleteId)
      this.dialog = false
      this.deleteId = null
    },
    goToCourse (id) {
      this.$router.push({
        name: 'user-course',
        params: {
          courseid: id
        }
      })
    },
    async getCourses () {
      this.loading = true
      await this.$store.dispatch('courses/GET_COURSES')
      this.loading = false
    }
  },
  created () {
    this.getCourses()
  },
  mounted () {},
  beforeMount () {}
}
</script>

<style>
</style>
