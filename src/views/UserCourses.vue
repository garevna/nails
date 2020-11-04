<template>
  <div>
    <!-- <v-breadcrumbs :items="items" divider="-"></v-breadcrumbs>
    <v-breadcrumbs :items="items" divider="."></v-breadcrumbs> -->
    <v-card-title> hello user courses</v-card-title>
    <v-card flat v-for=" course in userCourses" :key="course._id">
      <v-img :src="course.photo[0].link" contain></v-img>
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState('userCourses', ['userCourses']),
    ...mapState('auth', ['user'])
  },
  mounted () {
    this.$store.dispatch('userCourses/GET_USER_COURSES', this.user._id)
  }
}
</script>

<style>
</style>
