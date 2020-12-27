<template>
  <div id="edit-form">
    <CourseDetail
      v-if="course && !showForm"
      :course="course"
      type="online"
      btnTitle="BUY THIS COURSE"
    />
    <EditCourseForm
      v-if="showForm"
      typeCourse="online"
      :course="course"
      :back="backForm"
    />
    <div
      class="d-flex flex-column align-center flex-sm-row justify-sm-center mt-8"
    >
      <v-btn
        @click="goUploadVideos"
        v-if="addVideos"
        color="buttons"
        rounded
        large
        dark
        min-width="160"
        class="yellow-button my-8 my-sm-0 mr-sm-8"
        >Upload videos</v-btn
      >
      <v-btn
        @click="
          showForm = true;
          $vuetify.goTo('#edit-form', {
            duration: 500,
            offset: 80,
            easing: 'easeInOutCubic',
          });
        "
        v-if="!showForm"
        color="buttons"
        rounded
        large
        dark
        min-width="160"
        class="yellow-button my-8 my-sm-0 mr-sm-8"
        >Edit</v-btn
      >
      <v-btn
        @click="goToVideos"
        v-if="addVideo"
        color="buttons"
        rounded
        large
        dark
        min-width="160"
        class="yellow-button"
        >Videos</v-btn
      >
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import CourseDetail from '@/components/courses/CourseDetail.vue'
import EditCourseForm from '@/components/courses/EditCourseForm.vue'

export default {
  components: {
    EditCourseForm,
    CourseDetail
  },
  data () {
    return {
      showForm: false
    }
  },
  computed: {
    ...mapState('courses', ['courses', 'course']),
    addVideos () {
      return !this?.course?.videos?.length && !this.showForm
    },
    addVideo () {
      return this?.course?.videos?.length && !this.showForm
    }
  },
  watch: {
    course (val) {
      if (!val) return
      this.showForm = false
    }
  },
  methods: {
    editCourseById (data) {
      this.$store.dispatch('userCourses/PUT_USER_COURSE_ID', {
        data,
        id: this.courseId
      })
    },
    backForm () {
      this.showForm = false
    },
    goToVideos () {
      if (this.$route.name !== 'user-videos') {
        this.$router.push({ name: 'user-videos' })
      }
    },
    goUploadVideos () {
      if (this.$route.name !== 'add-course-videos') {
        this.$router.push({
          name: 'add-course-videos',
          params: {
            courseid: this.course._id
          }
        })
      }
    },
    async getCourse () {
      this.loading = true
      await this.$store.dispatch(
        'courses/GET_COURSE',
        this.$route.params.courseid
      )
      this.loading = false
    }
  },
  created () {
    this.getCourse()
  }
}
</script>

<style scoped>
.disabled-link-dark {
  color: grey;
}
</style>
