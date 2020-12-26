<template>
  <div>
    <v-card class="py-12" style="background-color: #414242">
      <div class="d-flex justify-center">
        <v-btn
          color="buttons"
          rounded
          small
          outlined
          primary
          class="ref d-flex justify-center yellow-button pa-6"
          @click="toOnlineCourses"
          >Online courses</v-btn
        >
      </div>
      <div class="d-flex flex-wrap justify-center">
        <CourseCard
          v-for="(card, index) in courses"
          :key="index"
          :course="card"
          type="online"
          :detailInfo="detailInfo"
          :payDetail="payDetail"
        />
      </div>
      <div class="d-flex justify-center">
        <v-btn
          color="buttons"
          rounded
          small
          outlined
          primary
          class="ref d-flex justify-center yellow-button pa-6"
          v-if="isHideMoreButtonOnline && this.$route.name !== 'home'"
          @click="getMoreOnlineCourses"
          >more online courses</v-btn
        >
      </div>
    </v-card>
    <v-card flat class="homefone py-12">
      <div class="d-flex justify-center">
        <v-btn
          color="buttons"
          rounded
          outlined
          large
          dark
          class="ref d-flex justify-center yellow-button pa-6"
          @click="toOfflineCourses"
          >Offline courses</v-btn
        >
      </div>
      <div class="d-flex flex-wrap justify-center">
        <CourseCard
          v-for="(card, index) in offlineCourses"
          :key="index"
          :course="card"
          type="offline"
          :detailInfo="detailInfo"
          :payDetail="payDetail"
        />
      </div>
      <div class="d-flex justify-center">
        <v-btn
          color="buttons"
          rounded
          small
          outlined
          primary
          class="ref d-flex justify-center yellow-button pa-6"
          v-if="isHideMoreButtonOnline && this.$route.name !== 'home'"
          @click="getMoreOfflineCourses"
          >more offline courses</v-btn
        >
      </div>
    </v-card>
  </div>
</template>

<style scoped lang="scss">
@import "@/css/variables.scss";
h2 {
  color: white;
}
.ref {
  font-size: 20px !important;
}
.ref:hover {
  cursor: pointer;
  color: #ffc44a;
}
</style>

<script>
import { mapState } from 'vuex'

import CourseCard from '@/components/courses/CourseCard.vue'

export default {
  components: {
    CourseCard
  },
  data () {
    return {
      coverImageSrc: require('../../assets/noImage.jpg')
    }
  },
  computed: {
    ...mapState('offlineCourses', ['offlineCourses', 'totalOfflineCourses']),
    ...mapState('courses', ['courses', 'total']),
    isHideMoreButtonOnline () {
      return this.courses.length < this.total
    },
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
    toOfflineCourses () {
      this.$router.push({ name: 'courses-offline' })
    },
    toOnlineCourses () {
      this.$router.push({ name: 'courses-online' })
    },
    async getCourses () {
      await this.$store.dispatch('offlineCourses/GET_OFFLINE_COURSES')
      await this.$store.dispatch('courses/GET_ALL_COURSES')
    },
    async getMoreOnlineCourses () {
      await this.$store.dispatch('courses/GET_MORE_COURSES', this.courses.length
      )
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
