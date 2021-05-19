<template>
  <v-card flat class="transparent mx-auto">
    <h2 class="text-center my-4">Cooperation</h2>
    <v-card-text class="d-flex justify-center colorParagraph--text"
      ><p>
        To enquire about batch orders or partnership please email to
        <span class="orange--text text-decoration-underline" style="cursor:pointer;">nailsauinfo@gmail.com</span>
      </p></v-card-text
    >
  </v-card>
</template>

<style lang="scss"></style>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Payment',
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState(['viewportWidth']),
    mobileMenu() {
      return this.viewportWidth < 960;
    },
  },
  watch: {},
  methods: {},
};
</script>
