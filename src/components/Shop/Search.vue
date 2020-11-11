<template>
  <v-row class="justify-end my-0 py-0">
    <v-col cols="11" sm="5" class="d-flex justify-end align-center gray-font">
      <h4 class="mr-5 pb-3">Search</h4>
      <v-text-field
      @change="search"
        clearable
        prepend-inner-icon="mdi-magnify"
        filled
        dense
        rounded
      ></v-text-field>
    </v-col>
    <v-col cols="1"></v-col>
  </v-row>
</template>

<style lang="scss" scoped>
@import '@/css/variables.scss';
</style>

<script>
export default {
  name: 'Search',
  props: [],
  data () {
    return {}
  },
  watch: {},
  methods: {
    search (value) {
      console.log('value', value)
      if (value.length >= 2) {
        this.$store.dispatch('shop/SEARCH_COMMODITIES', {
          search: value
        })
      }
    }
  },
  mounted () {
    console.log('mounted')
  }
}
</script>
