<template>
  <v-container>
    <v-row>
      <v-col cols="12" xs="12" md="6">
         <v-card flat>
          <v-card-title >{{getDetailCourse.name}}</v-card-title>
          <v-card-text>{{getDetailCourse.days}}{{getDetailCourse.price}}</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" xs="12" md="6">
        <v-img :src="getDetailCourse.img"></v-img>
      </v-col>
      <v-col cols="12" xs="12">
        <h2>this course is cuitable for:</h2>
          <v-list>
            <v-list-item v-for="(item,index) in getDetailCourse.coursesuitable" :key="index">
              {{item}}
            </v-list-item>
          </v-list>
          <p>Author and instructor of the course:{{getDetailCourse.author}} </p>
      </v-col>
      <v-col cols="12" xs="12">
        <p>{{getDetailCourse.onthiscourse}}</p>
      </v-col>
      <v-col cols="12" xs="12" >
         <v-btn @click="goToPersonalData">{{buttonForRegistrationOnlineShop}}</v-btn>
      </v-col>
      </v-row>
  </v-container>
</template>
<style scoped>
</style>
<script>
import { mapState } from 'vuex'
export default {
  name: 'course-online',
  data () {
    return {

    }
  },
  computed: {
    ...mapState(['onlineShop', 'buttonForRegistrationOnlineShop']),
    getDetailCourse () {
      return this.onlineShop.find(item => item.id === this.$route.params.id)
    }
  },
  methods: {
    goToPersonalData () {
      this.$router.push('/personal-data')
    }
  }

}
</script>
