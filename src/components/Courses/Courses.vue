<template>
  <v-container fluid fill-height class="homefone mt-16" >
    <v-row justify="center" class="mx-auto">
      <v-col>
        <v-row fluid justify="center" style="background-color: #414242">
          <v-col d-flex cols="12" xs="12">
            <h2 style="text-align:center;">Online course</h2>
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
      </v-col>
      <v-col justify-content-center cols="12" xs="12">
        <h2 class="homefone" style="text-align:center;">Offline course</h2>
      </v-col>
      <CoursesCard
        v-for="(card) in offlineShop"
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
<script>
import { mapState } from 'vuex'
import CoursesCard from '@/components/Courses/CoursesCard.vue'
export default {
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
    ...mapState(['offlineShop', 'onlineShop'])
  }
}
</script>
