<template>
  <v-container fluid class="homefone mt-16">
    <v-row justify="center" class="mx-auto">
      <v-col cols="12" xs="12" class="d-flex justify-center">
        <h2 class="header">All offline courses</h2>
      </v-col>
      <CourseCard
        v-for="(card, index) in offlineCourses"
        :key="index"
        :accessDays="card.accessDays"
        :url="checkUrl(card)"
        :name="card.nameOfCourse"
        :subtitle="card.subtitle"
        :price="card.price"
        :id="card._id"
        type="offline"
        :detailInfo="detailInfo"
        :payDetail="payDetail"
        :coverImageSrc="coverImageSrc"
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
import 'nails-courses-card'
import 'nails-courses-card/dist/nails-courses-card.css'
export default {
  name: 'courses-offline',
  components: {
  },
  data () {
    return {
      coverImageSrc: require('@/assets/noImage.jpg')
    }
  },
  computed: {
    ...mapState('offlineCourses', ['offlineCourses', 'totalOfflineCourses']),
    isHideMoreButtonOffline () {
      return this.offlineCourses.length < this.totalOfflineCourses
    }
  },
  methods: {
    detailInfo (route, id) {
      this.$router.push({ name: route, params: { id } })
    },
    payDetail () {
      this.$router.push({ name: 'personal-data' })
    },
    async getCourses () {
      await this.$store.dispatch('offlineCourses/GET_OFFLINE_COURSES')
    },
    async getMoreOfflineCourses () {
      await this.$store.dispatch('offlineCourses/GET_MORE_OFFLINE_COURSES', {
        skip: this.offlineCourses.length
      })
    },
    checkUrl (card) {
      let img
      if (card.photo && Array.isArray(card.photo) && card.photo.length) {
        img = card.photo[0].link
      }
      if (!img) {
        img = this.coverImageSrc
      }
    }
  },
  mounted () {
    this.getCourses()
  }
}
</script>
