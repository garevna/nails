<template>
  <v-container fluid fill-height class="homefone">
    <v-row align="center" justify="center">
      <v-col align="center">
        <h2>All courses</h2>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col>
        <v-card>
          <Courses/>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="scss">
h2 {
  color: white;
}
</style>

<script>
import Courses from '@/components/Courses/Courses.vue'

export default {
  name: 'courses',
  components: {
    Courses
  },
  data: () => ({}),
  computed: {},
  methods: {}
}
</script>
