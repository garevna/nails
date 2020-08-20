<template>
  <v-container>
    <v-row>
      <v-card flat>
        <v-card-title >{{getDetailCourse.name}}</v-card-title>
        <v-card-text>{{getDetailCourse.days}}{{getDetailCourse.price}}</v-card-text>
        <v-img :src="getDetailCourse.img"></v-img>
      </v-card>
      </v-row>
  </v-container>
</template>
<style scoped>
</style>
<script>
import { mapState } from 'vuex'
export default {
  name: 'course',
  data () {
    return {

    }
  },
  computed: {
    ...mapState(['offlineshop']),
    getDetailCourse () {
      return this.offlineshop.find(item => item.id === this.$route.params.id)
    }
  }

}
</script>
