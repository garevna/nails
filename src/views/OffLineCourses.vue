<template>
  <v-container fluid class="homefone mt-16">
    <v-row justify="center" class="mx-auto">
      <v-col cols="12" xs="12" class="d-flex justify-center">
        <h2 class="header">All offline courses</h2>
      </v-col>
      <CoursesCard
        v-for="(card, index) in offlineCourses"
        :key="index"
        :accessDays="card.accessDays"
        :img="card.photo.length > 0 ? card.photo[0].link  :  'https://www.classify24.com/wp-content/uploads/2017/04/no-image.png'"
        :name="card.nameOfCourse"
        :subtitle="card.subtitle"
        :price="card.price"
        :id="card._id"
        :offline="true"
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
        >more courses</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="scss">
.header {
  color: white;
}
</style>

<script>
import { mapState } from 'vuex'
import CoursesCard from '@/components/Courses/CoursesCard.vue'
export default {
  name: 'courses-offline',
  components: {
    CoursesCard
  },
  data () {
    return {}
  },
  computed: {
    ...mapState('offlineCourses', ['offlineCourses', 'totalOfflineCourses']),
    isHideMoreButtonOffline () {
      return this.offlineCourses.length < this.totalOfflineCourses
    }
  },
  methods: {
    async getCourses () {
      await this.$store.dispatch('offlineCourses/GET_OFFLINE_COURSES')
    },
    async getMoreOfflineCourses () {
      await this.$store.dispatch('offlineCourses/GET_MORE_OFFLINE_COURSES', {
        skip: this.offlineCourses.length
      })
    }
  },
  mounted () {
    this.getCourses()
  }
}
</script>
