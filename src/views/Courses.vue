<template>
  <div style="margin-left:-12px; margin-right:-12px;">
    <h2 class="d-flex justify-center my-12">All courses</h2>
    <Courses />
  </div>
</template>

<style scoped lang="scss">
h2 {
  color: white;
}
</style>

<script>
import Courses from '@/components/courses/Courses.vue'

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
