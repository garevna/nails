<template>
  <v-container>
    <!-- <v-row>
      <v-col
        cols="12"
        xs="12"
        order="2"
        sm="6"
        order-sm="2"
        class="d-flex flex-column justify-space-between align-center align-sm-start"
        >
        <v-card flat class="mb-8 transparent" dark>
          <v-card-title class="pa-0 pl-4">{{onlineCourseById.category}}</v-card-title>
          <v-card-text class="pa-0 pl-4 buttons--text" >Online course</v-card-text>
          <v-card-title class="pa-0 pl-4">{{onlineCourseById.nameOfCourse}}</v-card-title>
          <v-card-text class="pa-0 pl-4">{{onlineCourseById.subtitle}}</v-card-text>
          <v-card-title class="pa-0 pl-4 buttons--text">{{onlineCourseById.days}} days | $ {{onlineCourseById.price}}</v-card-title>
        </v-card>
        <v-card flat class="transparent d-flex flex-column align-center" dark>
          <v-card-title>This course is cuitable for:</v-card-title>
          <ul>
            <li v-for="(item,index) in onlineCourseById.thisCourseIsSuitableFor" :key="index">{{item}}</li>
          </ul>
        </v-card>
      </v-col>
      <v-col cols="12" xs="12"  order="1" sm="6" order-sm="2" align="center" justify="center" >
        <v-img width="400px" :src=" error ? 'https://www.classify24.com/wp-content/uploads/2017/04/no-image.png' : onlineCourseByIdImg " contain  @error="onError"></v-img>
      </v-col>
      <v-col cols="12" xs="12"  order="2">
        <v-card-text class="mt-16 whitefone--text d-flex justify-center justify-sm-start ">Author and instructor of the course: {{onlineCourseById.author}}</v-card-text>
      </v-col>
      <v-col cols="12" xs="12"  order="2">
        <v-card flat dark class="transparent">
          <v-card-title class="d-flex justify-center justify-sm-start">On this course:</v-card-title>
          <v-card-text>{{onlineCourseById.description}}</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" xs="12" class="d-flex justify-center justify-sm-end" order="2">
        <v-btn
          color="buttons"
          rounded
          small
          outlined
          primary
          min-width="90"
          class="yellow-button mr-4"
          @click="goToPersonalData"
        >{{buttonForRegistrationOnlineShop}}</v-btn>
      </v-col>
    </v-row> -->
    <CourseCardDetail
      :category="onlineCourseById.category"
      :days="onlineCourseById.days"
      :nameOfCourse="onlineCourseById.nameOfCourse"
      :subtitle="onlineCourseById.subtitle"
      :price="onlineCourseById.price"
      :author="onlineCourseById.author"
      :instructor="onlineCourseById.instructor"
      :infoBonus="onlineCourseById.infoBonus"
      :courseSuitable="onlineCourseById.thisCourseIsSuitableFor"
      :description="onlineCourseById.description"
      :dateOfCourses="onlineCourseById.dateOfCourses"
      :url="onlineCourseByIdImg"
      :type="typeCourse"
      :coverImageSrc="coverImageSrc"
        btnTitle="BUY THIS COURSE"
      :btnCallBack="btnCallBack"
    />
  </v-container>
</template>
<style scoped>
</style>
<script>
import { mapState } from 'vuex'
import 'nails-courses-card-detail'
import 'nails-courses-card-detail/dist/nails-courses-card-detail.css'
export default {
  name: 'course-online',
  data () {
    return {
      coverImageSrc: require('@/assets/noImage.jpg'),
      typeCourse: 'online'
    }
  },
  computed: {
    ...mapState('onlineCourses', ['onlineCourseById', 'onlineCourseByIdImg'])
  },
  methods: {
    btnCallBack () {
      this.$router.push({ name: 'personal-data' })
    },
    getCourse () {

    }
  },
  mounted () {
    this.$store.dispatch('onlineCourses/GET_ONLINE_COURSE_BY_ID', { id: this.$route.params.id })
  }
}
</script>
