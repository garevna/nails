<template>
  <v-card dark class="cardfone ma-16" width="360" min-height="360">
    <v-img :src="img" contain />
    <v-card-title class="buttons--text pa-0 pl-4 pt-4">
       {{accessDays}} days | $ {{ price }}
    </v-card-title>
    <v-card-title class="pa-0 pl-4">
       {{ name }}
    </v-card-title>
     <v-card-text class="pa-0 pl-4 pb-4">
        {{subtitle}}
     </v-card-text>
    <v-card v-if="online" flat class="ml-4 mb-4 d-flex">
      <v-btn
        color="buttons"
        rounded
        outlined
        small
        min-width="90"
        dark
        class="yellow-button mr-4"
        @click="detailOfflineInfo"
      >more</v-btn>
      <v-btn
        color="buttons"
        rounded
        small
        outlined
        primary
        min-width="90"
        class="yellow-button mr-4"
        @click="payDetail"
      >pay</v-btn>
    </v-card>
    <v-card v-else flat class="ml-4 mb-4 d-flex">
      <v-btn
        color="buttons"
        rounded
        outlined
        small
        dark
        min-width="90"
        class="yellow-button"
        @click="detailOnlineInfo"
      >more</v-btn>
    </v-card>
  </v-card>
</template>

<style scoped>
</style>

<script>

export default {
  name: 'course-card',
  props: ['img', 'name', 'price', 'id', 'offline', 'online', 'subtitle', 'accessDays'],
  data () {
    return {
    }
  },
  methods: {
    detailOfflineInfo () {
      this.$router.push({ name: 'course-offline', params: { id: this.id } })
    },
    detailOnlineInfo () {
      this.$router.push({ name: 'course-online', params: { id: this.id } })
    },
    payDetail () {
      this.$router.push({ name: 'personal-data' })
    }
  }
}
</script>
