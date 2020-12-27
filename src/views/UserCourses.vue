<template>
  <v-container fluid>
    <v-row class="d-flex justify-center">
      <v-col cols="12" xs="12" v-if="loading">
        <Spinner />
      </v-col>
      <v-col cols="12" xs="12" v-if="emptyCourses">
        <h3 align="center">You don't have courses yet</h3>
      </v-col>
      <v-col
        cols="12"
        xs="12"
        class="d-flex justify-center flex-wrap"
      >
        <!-- <v-card @click="goToCourse(course._id)">
          <v-card-title
            class="d-flex justify-center py-4"
            style="position: relative"
            ><h2>{{ course.nameOfCourse }}</h2>
            <div v-if="!course.isPaid" class="figure1">
              <h5 class="figure-text1">not paid</h5>
            </div>
            <div v-if="!course.isPublished" class="figure2">
              <h5 class="figure-text2">not published</h5>
            </div></v-card-title
          >
          <CoverImage :url="linkCheck(course)" :height="300" />
          <v-card-actions class="d-flex justify-end">
            <v-btn
              rounded
              color="buttons"
              large
              min-width="160"
              class="yellow-button"
              @click.stop="
                dialog = true;
                deleteId = course._id;
              "
              >Delete</v-btn
            >
          </v-card-actions>
        </v-card> -->
        <UserCourseCard
          v-for="course in courses"
          :key="course._id"
          :goToCourse="goToCourse"
          :course="course"
          :removeCourse="removeCourse"
        />
      </v-col>
      <v-dialog v-model="dialog" persistent max-width="320">
        <v-card>
          <v-card-title> Do you really want to remove course ?</v-card-title>
          <v-card-actions class="justify-center">
            <v-btn
              color="buttons"
              rounded
              large
              class="yellow-button"
              text
              @click="canselHandler"
            >
              Disagree
            </v-btn>
            <v-btn
              color="buttons"
              rounded
              large
              class="yellow-button"
              text
              @click="deleteCourse"
            >
              Agree
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>
<style scoped>
</style>
<script>
import { mapState } from 'vuex'

// import CoverImage from '@/components/CoverImage.vue'
import Spinner from '@/components/Spinner.vue'
import UserCourseCard from '@/components/courses/UserCourseCard.vue'
// import checkCourseLink from '@/helpers/checkCourseLink'
export default {
  name: 'UserCourses',
  components: {
    // CoverImage,
    UserCourseCard,
    Spinner
  },
  data () {
    return {
      loading: false,
      dialog: false,
      deleteId: null,
      imageUrl: null,
      errorLoad: false
    }
  },
  computed: {
    // ...mapState('userCourses', ['userCourses', 'loading']),
    ...mapState('courses', ['courses', 'course', 'videos', 'video']),
    ...mapState('auth', ['user']),
    emptyCourses () {
      return !this.loading && !this.courses.length
    }
  },
  methods: {
    // checkCourseLink: required('@/helpers/checkCourseLink').default,
    // linkCheck (course) {
    //   return checkCourseLink(course)
    // },
    canselHandler () {
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
