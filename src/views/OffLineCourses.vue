<template>
  <v-container fluid class="homefone mt-16">
    <v-row justify="center" class="mx-auto">
      <v-col cols="12" xs="12" class="d-flex justify-center">
        <h2>All offline courses</h2>
      </v-col>
      <CourseCard
        v-for="(card, index) in offlineCourses"
        :key="index"
        :course="card"
        type="offline"
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
          v-if="isHideMoreButtonOffline"
          @click="getMoreOfflineCourses"
          >more courses</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="scss">
</style>

<script>
import { mapActions, mapState } from 'vuex'

import CourseCard from '@/components/courses/CourseCard.vue'

export default {
  name: 'OfflineCourses',
  components: {
    CourseCard
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState('offlineCourses', ['offlineCourses', 'totalOfflineCourses']),
    isHideMoreButtonOffline () {
      return this.offlineCourses.length < this.totalOfflineCourses
    }
  },
  methods: {
    ...mapActions('offlineCourses',{
      getCourses: 'GET_OFFLINE_COURSES',
      getMoreCourses: 'GET_MORE_OFFLINE_COURSES'
    }),
    detailInfo (route, id) {
      this.$router.push({ name: route, params: { id } })
    },
    payDetail () {
      this.$router.push({ name: 'personal-data' })
    },
    getMoreOfflineCourses () {
      this.getMoteCourses(this.offlineCourses.length)
    }
  },
  mounted () {
    this.getCourses()
  }
}
</script>
