<template>
  <v-container>
    <v-row>
      <v-col cols="12" offset-sm="2" sm="8" class="pa-0 mb-4">
        <v-card flat class="transparent" style="color: #fff">
          <v-card-title>Portal terms of use</v-card-title>
          <v-card-text style="color: #fff"
            >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel
            reprehenderit repellendus nesciunt voluptatibus porro saepe dicta
            numquam aliquid aperiam explicabo a nisi sapiente, velit, veritatis
            nobis. Placeat doloremque in inventore.</v-card-text
          >
        </v-card>
      </v-col>
      <v-col cols="12">
        <AddCourseForm type="online" />
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
</style>
<script>
import AddCourseForm from '@/components/forms/AddCourseForm.vue'
export default {
  name: 'AddCourse',
  components: {
    AddCourseForm
  },
  data () {
    return {
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {
  }
}
</script>
