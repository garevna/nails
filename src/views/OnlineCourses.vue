<template>
  <v-container fluid fill-height class="homefone mt-16">
    <v-row justify="center" class="mx-auto">
      <v-col cols="12" xs="12" class="d-flex justify-center">
        <h2 class="header">All online courses</h2>
      </v-col>
      <CoursesCard
        v-for="(card, index) in onlineCourses"
        :key="index"
        :accessDays="card.accessDays"
        :img="card.photo"
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
          v-if="isHideMoreButtonOnline"
          @click="getMoreOnlineCourses"
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
  name: 'courses-online',
  components: {
    CoursesCard
  },
  data () {
    return {}
  },
  computed: {
    ...mapState('onlineCourses', ['onlineCourses', 'totalOnlineCourses']),
    isHideMoreButtonOnline () {
      return this.onlineCourses.length < this.totalOnlineCourses
    }
  },
  methods: {
    async getCourses () {
      await this.$store.dispatch('onlineCourses/GET_ONLINE_COURSES')
    },
    async getMoreOnlineCourses () {
      await this.$store.dispatch('onlineCourses/GET_MORE_ONLINE_COURSES', {
        skip: this.onlineCourses.length
      })
    }
  },
  mounted () {
    this.getCourses()
  }
}
</script>
