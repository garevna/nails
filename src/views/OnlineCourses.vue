<template>
  <v-container fluid fill-height class="homefone mt-16">
    <v-row justify="center" class="mx-auto">
      <v-col justify-content-center cols="12" xs="12">
        <h2 class="header" style="text-align:center;">All online courses</h2>
      </v-col>
      <CoursesCard
        v-for="(card) in onlineShop"
        :key="card.name"
        :img="card.img"
        :name="card.name"
        :price="card.price"
        :id="card.id"
        :online="true"
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
  name: 'courses-online',
  components: {
    CoursesCard
  },
  data () {
    return {}
  },
  computed: {
    ...mapState('course', ['onlineShop'])
  },
  methods: {}
}
</script>
