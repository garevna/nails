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
    ...mapState('userCourses', ['userCourses']),
    ...mapState('auth', ['user'])
  },
  watch: {
    user (newVal) {
      // this.$store.dispatch('userCourses/GET_USER_COURSES', newVal._id)
      this.items[0].text = `${newVal.firstName} cabinet`
      this.items[1].text = `${newVal.firstName} courses`
    },
    course (val) {
      this.items[2].text = `${val.nameOfCourse}`
    }
  },
  methods: {
    fillingInTheFields () {
      this.items[0].text = `${this.user.firstName} cabinet`
      this.items[1].text = `${this.user.firstName} courses`
      // this.items[2].text = `${this.course.nameOfCourse}`
    },
    async getCourseById () {
      const response = await (
        await fetch(
          `https://nails-australia-staging.herokuapp.com/course/online/${this.courseId}`
        )
      ).json()
      if (!response.error) {
        console.log(response)
        this.course = response.onlineCourse
        this.ready = true
      }
    },
    async editCourseById (data) {
      const response = await (
        await fetch(
          `https://nails-australia-staging.herokuapp.com/course/online/${this.courseId}`, {
            method: 'PUT',
            body: data
          }
        )
      ).json()
      if (!response.error) {
        console.log(response)
        this.course = response.updatedOnlineCourse
        this.showForm = false
        this.ready = true
      }
    },
    backForm () {
      this.showForm = false
    },
    goToVideos () {
      if (this.$route.name !== 'user-videos') this.$router.push({ name: 'user-videos' })
    }
  },
  created () {
    this.fillingInTheFields()
    this.getCourseById()
  }
}
</script>

<style scoped>
.disabled-link-dark {
  color: grey;
}
</style>
