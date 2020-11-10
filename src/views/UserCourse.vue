<template>
  <div>
    <v-breadcrumbs :items="items">
      <template v-slot:item="{ item }">
        <v-breadcrumbs-item :disabled="item.disabled">
          <router-link
            :to="item.href"
            :class="{ 'disabled-link-dark': item.disabled }"
          >
            {{ item.text.toUpperCase() }}</router-link
          >
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>
    <CourseCardDetail
      v-if="ready && !showForm"
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
      :btnCallBack="null"
    />
    <EditCourseForm
      v-if="showForm"
      :editCourseById="editCourseById"
      :typeCourse="typeCourse"
      :course="course"
      :back="backForm"
      :coverImageSrc="coverImageSrc"
    />
    <v-btn @click="showForm=true" v-if="!showForm">Edit</v-btn>
    <v-btn @click="goToVideos" v-if="!showForm">Videos</v-btn>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import 'nails-courses-card-detail'
import 'nails-courses-card-detail/dist/nails-courses-card-detail.css'
import EditCourseForm from '@/components/Courses/EditCourseForm.vue'
export default {
  components: {
    EditCourseForm
  },
  data () {
    return {
      courseId: this.$route.params.courseid,
      course: null,
      ready: false,
      typeCourse: 'online',
      showForm: false,
      coverImageSrc: require('@/assets/noImage.jpg'),
      items: [
        {
          text: '',
          disabled: false,
          href: '/user-cabinet'
        },
        {
          text: '',
          disabled: false,
          href: '/user-cabinet/courses'
        },
        {
          text: '',
          disabled: true,
          href: '#'
        }
      ]
    }
  },
  computed: {
    ...mapState('userCourses', ['userCourses', 'currentCourse', 'currentCourseId']),
    ...mapState('auth', ['user'])
  },
  watch: {
    user (newVal) {
      this.fillingInTheFields()
    },
    course (val) {
      this.items[2].text = `${val.nameOfCourse}`
    },
    currentCourse (course) {
      if (!course) return
      this.course = course
      this.showForm = false
      this.ready = true
    }
  },
  methods: {
    fillingInTheFields () {
      if (!this.user) return
      this.items[0].text = `${this.user.firstName} cabinet`
      this.items[1].text = `${this.user.firstName} courses`
      // this.items[2].text = `${this.course.nameOfCourse}`
    },
    editCourseById (data) {
      this.$store.dispatch('userCourses/PUT_USER_COURSE_ID', { data, id: this.courseId })
    },
    backForm () {
      this.showForm = false
    },
    goToVideos () {
      if (this.$route.name !== 'user-videos') this.$router.push({ name: 'user-videos' })
    }
  },
  mounted () {
    this.fillingInTheFields()
    // this.getCourseById()
    if (this.currentCourseId !== this.courseId) {
      this.$store.dispatch('userCourses/GET_USER_COURSE_ID', this.courseId)
    } else {
      this.items[2].text = `${this.currentCourse.nameOfCourse}`
      this.course = this.currentCourse
      this.ready = true
    }
  }
}
</script>

<style scoped>
.disabled-link-dark {
  color: grey;
}
</style>
