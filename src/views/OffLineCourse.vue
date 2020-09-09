<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        xs="12"
        order="2"
        sm="6"
        order-sm="2"
        class="d-flex flex-column justify-space-between align-center align-sm-start"
      >
        <v-card flat class="mb-8 transparent" dark>
          <v-card-title class="pa-0 pl-4">{{offlineCourseById.category}}</v-card-title>
          <v-card-text class="pa-0 pl-4 buttons--text">offline course</v-card-text>
          <v-card-title class="pa-0 pl-4">{{offlineCourseById.nameOfCourse}}</v-card-title>
          <v-card-text class="pa-0 pl-4">{{offlineCourseById.subtitle}}</v-card-text>
          <v-card-title
            class="pa-0 pl-4 buttons--text"
          >{{offlineCourseById.days}} days | $ {{offlineCourseById.price}}</v-card-title>
        </v-card>
        <v-card flat class="transparent d-flex flex-column align-center" dark>
          <v-card-title>This course is cuitable for:</v-card-title>
          <ul>
            <li v-for="(item,index) in offlineCourseById.thisCourseIsSuitableFor" :key="index">{{item}}</li>
          </ul>
        </v-card>
      </v-col>
      <v-col cols="12" xs="12" order="1" sm="6" order-sm="2" align="center" justify="center">
        <v-img width="400px" :src="offlineCourseById.photo"></v-img>
      </v-col>
      <v-col cols="12" xs="12" order="2">
        <v-card-text
          class="mt-16 whitefone--text d-flex justify-center justify-sm-start"
        >Author and instructor of the course: {{offlineCourseById.author}}</v-card-text>
      </v-col>
      <v-col cols="12" xs="12" order="2">
        <v-card flat dark class="transparent">
          <v-card-title class="d-flex justify-center justify-sm-start">On this course:</v-card-title>
          <v-card-text>{{offlineCourseById.description}}</v-card-text>
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
        >{{buttonForDetailOfflineShop}}</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
</style>
<script>
import { mapState } from 'vuex'
export default {
  name: 'course-offline',
  data () {
    return {}
  },
  computed: {
    ...mapState('offlineCourses', ['offlineCourseById']),
    ...mapState([
      'buttonForDetailOfflineShop',
      'buttonForRegistrationOfflineShop'
    ])
  },
  methods: {
    goToPersonalData () {
      this.$router.push({ name: 'personal-data' })
    },
    async getCourse () {
      await this.$store.dispatch('offlineCourses/GET_OFFLINE_COURSE_BY_ID', { id: this.$route.params.id })
    }
  },
  mounted () {
    this.getCourse()
  }
}
</script>
