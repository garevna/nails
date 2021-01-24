<template>
  <v-container fluid fill-height class="homefone mt-16">
    <v-row justify="center" class="mx-auto">
      <v-col cols="12" xs="12" class="d-flex justify-center">
        <h2>All online courses</h2>
      </v-col>
      <CourseCard
        v-for="(card, index) in courses"
        :key="index"
        :course="card"
        type="online"
        :detailInfo="detailInfo"
        :payDetail="payDetail"
      />
      <v-col class="d-flex justify-center" cols="12" xs="12">
        <v-btn
          color="buttons"
          rounded
          outlined
          small
          dark
          min-width="90"
          class="yellow-button"
          v-if="isHideMoreButtonOnline"
          @click="getMoreCourses(courses.length)"
          >more courses</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="scss">
</style>

<script>
import { mapState, mapActions } from 'vuex'

import CourseCard from '@/components/courses/CourseCard.vue'

export default {
  name: 'courses-online',
  components: {
    CourseCard
  },
  data () {
    return {
      coverImageSrc: require('@/assets/noImage.jpg')
    }
  },
  computed: {
    ...mapState('courses', [
      'courses',
      // 'course'
      // 'videos',
      'total'
    ]),
    isHideMoreButtonOnline () {
      return this.courses.length < this.total
    }
  },
  methods: {
    ...mapActions('courses',{
      getMoreCourses: 'GET_MORE_COURSES',
      getAllCourses: 'GET_ALL_COURSES'
    }),
    detailInfo (route, id) {
      this.$router.push({ name: route, params: { id } })
    },
    payDetail () {
      this.$router.push({ name: 'personal-data' })
    },
    // getMoreOnlineCourses () {
    //   this.getMoreCourses(this.courses.length)
    // }
  },
  mounted () {
    this.getAllCourses()
  }
}
</script>
