<template>
  <v-row class="justify-center justify-sm-end my-0 py-0">
    <v-col cols="11" md="5" class="d-flex justify-end align-center gray-font px-0 px-sm-3 pr-lg-10">
      <h4 class="mr-5 pb-3">Search</h4>
      <v-text-field
        @input="searchDebounced"
        v-model="search"
        clearable
        prepend-inner-icon="mdi-magnify"
        filled
        dense
        rounded
      ></v-text-field>
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped>
@import '@/css/variables.scss';
</style>

<script>
import debounce from '@/utils/debounce';

export default {
  name: 'Search',
  props: [],
  data() {
    return { search: '' };
  },
  watch: {},
  computed: {
    searchDebounced() {
      return debounce(this.searchHandler, 1000);
    },
  },
  methods: {
    searchHandler(value) {
      this.$store.dispatch('shop/SEARCH_COMMODITIES', {
        search: value,
      });
    },
  },
  mounted() {
  },
};
</script>
