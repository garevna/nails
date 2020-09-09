<template>
  <v-container fluid class="homefone mt-16 mx-0 ma-0 px-0">
    <v-row justify="center" class="mx-0">
      <v-col>
        <v-row fluid justify="center" style="background-color: #414242">
          <v-col cols="12" xs="12" class="d-flex justify-center">
            <h2 class="ref" @click="toOnlineCourses">Online courses</h2>
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
            :online="true"
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
              v-if="isHideMoreButtonOnline && this.$route.name !== 'home'"
              @click="getMoreOnlineCourses"
            >more courses</v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" xs="12" class="d-flex justify-center">
        <h2 class="homefone ref" @click="toOfflineCourses">Offline courses</h2>
      </v-col>
      <CoursesCard
        v-for="(card, index) in offlineCourses"
        :key="index"
        :accessDays="card.accessDays"
        :img="card.photo"
        :name="card.nameOfCourse"
        :subtitle="card.subtitle"
        :price="card.price"
        :id="card._id"
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
          v-if="isHideMoreButtonOffline && this.$route.name !== 'home'"
          @click="getMoreOfflineCourses"
        >more courses</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="scss">
@import "@/css/variables.scss";
h2 {
  color: white;
}
.ref:hover {
  cursor: pointer;
  color: #ffc44a;
}
</style>

<script>
import { mapState } from 'vuex'
import CoursesCard from '@/components/Courses/CoursesCard.vue'
export default {
  components: {
    CoursesCard
  },
  data () {
    return {}
  },
  computed: {
    ...mapState('offlineCourses', ['offlineCourses', 'totalOfflineCourses']),
    ...mapState('onlineCourses', ['onlineCourses', 'totalOnlineCourses']),
    isHideMoreButtonOnline () {
      return this.onlineCourses.length < this.totalOnlineCourses
    },
    isHideMoreButtonOffline () {
      return this.offlineCourses.length < this.totalOfflineCourses
    }
  },
  methods: {
    toOfflineCourses () {
      this.$router.push({ name: 'courses-offline' })
    },
    toOnlineCourses () {
      this.$router.push({ name: 'courses-online' })
    },
    addOnLineCourses () {},
    async getCourses () {
      await this.$store.dispatch('offlineCourses/GET_OFFLINE_COURSES')
      await this.$store.dispatch('onlineCourses/GET_ONLINE_COURSES')
    },
    async getMoreOnlineCourses () {
      await this.$store.dispatch('onlineCourses/GET_MORE_ONLINE_COURSES', {
        skip: this.onlineCourses.length
      })
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
