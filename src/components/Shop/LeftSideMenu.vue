<template>
  <v-row justify="center">
    <v-expansion-panels flat accordion class="px-0 py-5 left-side-header">
      <v-expansion-panel v-for="section in categories" :key="section._id">
        <v-expansion-panel-header class="mb-0" @click="setSection(section)">
          <span class="d-flex justify-start align-center text-h5 font-weight-bold dgrey--text">
            {{ section.name }} <v-icon left v-if="section.subcategories.length">mdi-menu-down</v-icon></span
          >
        </v-expansion-panel-header>
        <v-expansion-panel-content class="justify-md-start justify-center" v-if="section.subcategories.length">
          <v-row class="ma-0">
            <v-col v-for="(subsection, ind) in section.subcategories" :key="ind" cols="12" class="pa-1 ma-0">
              <span
                @click="setSection(subsection)"
                style="cursor: pointer"
                class="lgray--text text-h6 ml-5 mb-2 font-weight-medium"
                :style="{
                  textDecoration: activeCategory && activeCategory._id === subsection._id ? 'underline' : 'none',
                }"
              >
                {{ subsection.name }}
              </span>
            </v-col>
            <v-col class="d-flex ml-10 mt-2 pa-0">
              <span
                @click="setSection(section)"
                style="cursor: pointer"
                :style="{
                  textDecoration: activeCategory && activeCategory._id === section._id ? 'underline' : 'none',
                }"
                class="lgray--text text-h6 font-weight-medium"
              >
                View all
              </span>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-row>
</template>

<style lang="scss">
@import '@/css/variables.scss';
.left-side-header {
  .v-expansion-panel-header {
    padding-bottom: 0 !important;
    padding-top: 0 !important;
  }
  .v-expansion-panel-content__wrap {
    padding-top: 0 !important;
    margin-top: 0 !important;
  }
}
.v-expansion-panel--active > .v-expansion-panel-header {
  min-height: 50px !important;
}
</style>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Shop',
  props: ['setSelectedSection'],
  computed: {
    ...mapState('shop', ['categories', 'activeCategory']),
    panels() {
      return this.categories.map(() => false);
    },
  },
  methods: {
    setSection(section) {
      if (this.$route.name !== 'shop' || this.$route.params.categoryName !== section.slug) {
        this.$router.push({
          name: 'shop',
          params: { categoryName: section.slug },
        });
      }
    },
  },
};
</script>
