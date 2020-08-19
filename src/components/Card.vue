<template>
  <v-card class="cardfone ma-8" width="240" height="280">
    <v-card flat class="px-0 pt-4">
      <v-img :src="img" width="240" height="160" contain />
    </v-card>
    <v-card-text>
      <h4>{{ name }}</h4>
      <h4>Price {{ price }}</h4>
    </v-card-text>
  </v-card>
</template>

<style scoped>
</style>

<script>

export default {
  name: 'Card',
  props: ['img', 'name', 'price']
}
</script>
