<template>
  <v-container fluid fill-height class="homefone">
    <v-card flat class="transparent mx-auto" max-width="1440" width="100%" dark>
      <v-row>
        <h1>COOPERATION PAGE</h1>
      </v-row>
    </v-card>
  </v-container>
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
