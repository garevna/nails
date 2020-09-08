<template>
  <v-container fluid class="homefone mt-16 mx-0 ma-0 px-0" >
    <v-row justify="center" class="mx-0">
      <v-col>
        <v-row fluid justify="center" style="background-color: #414242">
          <v-col d-flex cols="12" xs="12">
            <h2 style="text-align:center;" class="ref" @click="toOnlineCourses">Online courses</h2>
          </v-col>
          <CoursesCard
            v-for="(card) in onlineCards"
            :key="card.name"
            :img="card.img"
            :name="card.name"
            :price="card.price"
            :id="card.id"
            :online="true"
          />
        </v-row>
      </v-col>
      <v-col justify-content-center cols="12" xs="12">
        <h2 class="homefone ref" style="text-align:center;" @click="toOfflineCourses">Offline courses</h2>
      </v-col>
      <CoursesCard
        v-for="(card) in offlineCards"
        :key="card.name"
        :img="card.img"
        :name="card.name"
        :price="card.price"
        :id="card.id"
        :offline="true"
      />
    </v-row>
  </v-container>
</template>

<style scoped lang="scss">
@import '@/css/variables.scss';
h2 {
  color: white;
}
.ref:hover {
  cursor: pointer;
  color: #FFC44A;
}
</style>

<script>
import { mapState } from 'vuex'
import CoursesCard from '@/components/Courses/CoursesCard.vue'
export default {
  props: ['offlineLimit', 'onlineLimit'],
  components: {
    CoursesCard
  },
  data () {
    return {
      // offlineCourse: false,
      // onlineCourse: false
    }
  },
  computed: {
    ...mapState('course', ['offlineShop', 'onlineShop']),
    offlineCards () {
      return this.offlineShop.filter((item, index) => index < this.offlineLimit)
    },
    onlineCards () {
      return this.onlineShop.filter((item, index) => index < this.onlineLimit)
    }
  },
  methods: {
    toOfflineCourses () {
      this.$router.push('/courses-offline')
    },
    toOnlineCourses () {
      this.$router.push('/courses-online')
    }
  }
}
</script>
