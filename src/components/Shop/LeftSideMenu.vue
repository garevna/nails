<template>
  <v-expansion-panels flat accordion class="px-0 py-5">
    <v-expansion-panel v-for="(section, i) in categories" :key="section._id">
      <v-expansion-panel-header
        class="mb-0 py-0"
        :class="{ hide: !section.subcategories.length }"
        @click="currentIndex = currentIndex === i ? null : i"
      >
        <h2 class="d-flex justify-start align-center dgrey--text">
          {{ section.name }}
          <!-- <v-icon left v-if="section.subcategories.length">{{
            currentIndex === i ? 'mdi-menu-up' : 'mdi-menu-down'
          }}</v-icon> -->
        </h2>
      </v-expansion-panel-header>
      <v-expansion-panel-content class="justify-md-start justify-center" v-if="section.subcategories.length">
        <v-row class="ma-0">
          <v-col v-for="(subsection, ind) in section.subcategories" :key="ind" cols="12" class="pa-1 ma-0">
            <h3
              @click="setSection(subsection)"
              style="cursor: pointer"
              class="lgray--text ml-5 mb-2"
              :style="{
                textDecoration: textDecoration(subsection._id),
              }"
            >
              {{ subsection.name }}
            </h3>
          </v-col>

          <v-col class="d-flex ml-10 mt-2 pa-0">
            <h3
              @click="setSection(section)"
              style="cursor: pointer"
              :style="{
                textDecoration: textDecoration(section._id),
              }"
              class="lgray--text"
            >
              View all
            </h3>
          </v-col>
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>


<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'LeftSideMenu',
  data() {
    return {
      currentIndex: null,
    };
  },
  computed: {
    ...mapState('shop', ['categories']),
    ...mapGetters('shop', ['fullListOfCategories']),
    activeCategory() {
      return this.fullListOfCategories.find(category => category.slug === this.$route.params.categoryName) ?? null;
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
    textDecoration(id) {
      return this.activeCategory?._id === id ? 'underline' : 'none';
    },
  },
};
</script>

<style scoped>
.v-expansion-panel--active > .v-expansion-panel-header {
  min-height: 50px !important;
}
</style>