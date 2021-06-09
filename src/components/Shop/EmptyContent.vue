<template>
  <v-card
    flat
    height="100%"
    class="justify-center align-items-center flex-column ma-0 pa-0 d-flex"
    width="100%"
    justify="center"
  >
    <v-card-text class="d-flex flex-column justify-center align-center">
      <h2 class="dgrey--text text-center" style="font-size:18px;">Unfortunately, there are no products <br /></h2>

      <h2 class="dgrey--text text-center" style="font-size:18px;">suitable for your request...</h2>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'EmptyContent',
};
</script>