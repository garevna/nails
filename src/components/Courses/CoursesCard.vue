<template>
  <v-card class="cardfone ma-16" width="360" min-height="360">
    <v-img :src="img" contain />
    <v-card-text>
      <h4>{{ name }}</h4>
      <h4>Price {{ price }}</h4>
    </v-card-text>
    <v-card flat class="ml-4 mb-4">
      <v-btn
        color="buttons"
        rounded
        outlined
        small
        min-width="90"
        dark
        class="yellow-button"
        v-if="offline"
        @click="detailOfflineInfo"
      >more</v-btn>
      <v-btn
        color="buttons"
        rounded
        small
        dark
        min-width="90"
        class="yellow-button mr-4"
        v-if="online"
        @click="payDetail"
      >pay</v-btn>
      <v-btn
        color="buttons"
        rounded
        outlined
        small
        dark
        min-width="90"
        class="yellow-button"
        v-if="online"
        @click="detailOnlineInfo"
      >more</v-btn>
    </v-card>
  </v-card>
</template>

<style scoped>
</style>

<script>

export default {
  name: 'course-offline-card',
  props: ['img', 'name', 'price', 'id', 'offline', 'online'],
  data () {
    return {
    }
  },
  methods: {
    detailOfflineInfo () {
      this.$router.push(`/course-offline/${this.id}`)
    },
    detailOnlineInfo () {
      this.$router.push(`/course-online/${this.id}`)
    },
    payDetail () {
      console.log('i`m work!')
    }
  }
}
</script>
