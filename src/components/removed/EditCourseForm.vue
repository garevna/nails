<template>
  <v-container>
    <v-row>
      <v-col cols="12" xs="12" md="7">
        <AddCourseForm v-if="ready" :course.sync="courseData" @back="back" />
      </v-col>
      <v-col
        cols="12"
        xs="12"
        md="5"
        class="d-flex flex-column justify-space-between align-center"
      >
        <CourseCard v-if="ready" :course="courseData" :type="type" />
      </v-col>
      <CourseDetail
        v-if="course && ready"
        :course="courseData"
        :type="type"
        btnTitle="BUY THIS COURSE"
      />
    </v-row>
  </v-container>
</template>
<style scoped></style>
<script>
import CourseCard from '@/components/courses/CourseCard.vue'
import CourseDetail from '@/components/courses/CourseDetail.vue'
import AddCourseForm from '@/components/forms/AddCourseForm.vue'

export default {
  name: 'EditCourseForm',
  components: {
    CourseDetail,
    CourseCard,
    AddCourseForm
  },

  props: ['type', 'course', 'back'],
  data () {
    return {
      courseData: null,
      ready: false
      // courseData: {
      //   businessName: '',
      //   category: '',
      //   nameOfCourse: '',
      //   subtitle: '',
      //   accessDays: '',
      //   price: '',
      //   author: '',
      //   instructor: '',
      //   infoForBonus: '',
      //   description: '',
      //   photo: null,
      //   thisCourseIsSuitableFor: ['']
      // }
    }
  },
  watch: {},
  methods: {
    fillingForm () {
      if (this.course) {
        this.courseData = this.course
        // Object.keys(this.course).forEach(key => {
        //   this.courseData[key] = this.course[key]
        // })
        this.ready = true
      }
    }
  },
  mounted () {
    this.fillingForm()
  },
  created () {
    // window.onbeforeunload = () => 'Are you sure you want to leave?'
  },
  // updated () {
  //   this.fillingForm()
  // },
  beforeDestroy () {
    // window.onbeforeunload = () => null
  }
}
</script>
