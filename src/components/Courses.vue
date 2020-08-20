<template>
  <v-container fluid fill-height class="homefone" >
    <v-row justify="center">
      <Card
        v-for="(card, num) in offlineshop"
        :key="num"
        :img="card.img"
        :name="card.name"
        :price="card.price"
        :nameCourseOffline="offlineCourse"
        :id="card.id"
      />
    </v-row>
  </v-container>
</template>
<script>
import { mapState } from 'vuex'
import Card from '@/components/Card.vue'
export default {
  components: {
    Card
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
