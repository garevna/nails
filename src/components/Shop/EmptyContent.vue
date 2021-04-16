<template>
  <v-card
    flat
    height="100%"
    class="justify-center align-items-center flex-column ma-0 pa-0 d-flex"
    width="100%"
    justify="center"
  >
    <v-card-text class="d-flex flex-column justify-center align-center">
      <p class="dgrey--text text-center text-h4 font-weight-medium">Unfortunately, there are no products <br /></p>

      <p class="dgrey--text text-center text-h4 font-weight-medium">suitable for your request...</p>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'EmptyContent',
};
</script>