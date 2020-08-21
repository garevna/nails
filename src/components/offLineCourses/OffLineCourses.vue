<template>
  <v-container fluid fill-height class="homefone" >
    <v-row justify="center">
      <OffLineCoursesCard
        v-for="(card, num) in offlineshop"
        :key="num"
        :img="card.img"
        :name="card.name"
        :price="card.price"
        :id="card.id"
      />
    </v-row>
  </v-container>
</template>
<script>
import { mapState } from 'vuex'
import OffLineCoursesCard from '@/components/offLineCourses/OffLineCoursesCard.vue'
export default {
  components: {
    OffLineCoursesCard
  },
  data () {
    return {
      offlineCourse: true

    }
  },
  computed: {
    ...mapState(['offlineshop'])
  }
}
</script>
