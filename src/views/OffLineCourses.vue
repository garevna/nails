<template>
  <v-container fluid class="homefone mt-16">
    <v-row justify="center" class="mx-auto">
      <v-col justify-content-center cols="12" xs="12">
        <h2 class="header" style="text-align:center;">All offline courses</h2>
      </v-col>
      <CoursesCard
        v-for="(card,index) in offlineCourses"
        :key="index"
        :accessDays="card.accessDays"
        :img="card.photo"
        :name="card.nameOfCourse"
        :subtitle="card.subtitle"
        :price="card.price"
        :id="card._id"
        :offline="true"
      />
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
    ...mapState('offlineCourses', ['offlineCourses'])
  },
  methods: {
    async getCourses () {
      await this.$store.dispatch('offlineCourses/GET_OFFLINE_COURSES')
    }
  },
  mounted () {
    this.getCourses()
  }
}
</script>
