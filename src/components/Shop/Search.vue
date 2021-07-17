<template>
  <v-row class="justify-center justify-sm-end my-0 py-0">
    <v-col cols="11" md="5" class="d-flex justify-end align-center gray-font px-0 px-sm-3 pr-lg-10">
      <h4 class="mr-5">Search</h4>

      <v-text-field v-model="searchStr" clearable prepend-inner-icon="mdi-magnify" filled dense rounded hide-details></v-text-field>
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped>
@import '@/css/variables.scss';
</style>

<script>
import { mapState, mapGetters } from 'vuex';
import debounce from '@/utils/debounce';

export default {
  name: 'Search',
  props: [],
  data() {
    return {};
  },
  watch: {
    activeCategory() {
      this.searchHandler('');
    },
  },
  computed: {
    ...mapState('shop', ['search']),
    ...mapGetters('shop', ['fullListOfCategories', 'pages']),
    activeCategory() {
      return this.fullListOfCategories.find(category => category.slug === this.$route.params.categoryName) || null;
    },
    searchStr: {
      get() {
        return this.search;
      },
      set(val) {
        this.searchDebounced(val);
      },
    },
    searchDebounced() {
      return debounce(this.searchHandler, 1000);
    },
  },
  methods: {
    searchHandler(value) {
      this.$store.commit('shop/SEARCH', value || '');
    },
  },
  mounted() {},
};
</script>
