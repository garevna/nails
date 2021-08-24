<template>
  <v-container>
    <v-row>
      <v-col cols="12" offset-sm="2" sm="8" class="pa-0 mb-4">
        <v-card flat class="transparent">
          <v-card-title>Portal terms of use</v-card-title>
          <v-card-text
            >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel
            reprehenderit repellendus nesciunt voluptatibus porro saepe dicta
            numquam aliquid aperiam explicabo a nisi sapiente, velit, veritatis
            nobis. Placeat doloremque in inventore.</v-card-text
          >
        </v-card>
      </v-col>
      <v-col cols="12">
        <AddCourseForm @submit="submit" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
</style>

<script>
import { mapActions } from 'vuex'

import AddCourseForm from '@/components/forms/AddCourseForm.vue'
export default {
  name: 'AddCourse',
  components: {
    AddCourseForm
  },
  methods: {
    ...mapActions('courses', {
      createCourse: 'POST_COURSE'
    }),
    submit (fd) {
      this.createCourse(fd)
    }
  }
}
</script>
