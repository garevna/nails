<template>
  <v-card class="cardfone ma-8" width="240" height="280">
    <v-card flat class="px-0 pt-4">
      <v-img :src="img" width="240" height="160" contain />
    </v-card>
    <v-card-text>
      <h4>{{ name }}</h4>
      <h4>Price {{ price }}</h4>
    </v-card-text>
    <v-btn @click="detailInfo">more</v-btn>
  </v-card>
</template>

<style scoped>
</style>

<script>

export default {
  name: 'course-offline-card',
  props: ['img', 'name', 'price', 'id'],
  data () {
    return {

    }
  },
  methods: {
    detailInfo () {
      this.$router.push(`/course-offline/${this.id}`)
    }
  }
}
</script>
