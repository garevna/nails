<template>
  <v-expansion-panels flat accordion class="px-0 py-5">
    <v-expansion-panel v-for="(section, i) in categories" :key="section._id">
      <v-expansion-panel-header
        class="my-0 py-0 header-expansion"
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
        <h3
          v-for="(subsection, ind) in section.subcategories"
          :key="ind"
          @click="
            setSection(subsection);
            $emit('subClick');
          "
          style="cursor: pointer"
          class="lgray--text ml-4"
          :style="{
            textDecoration: textDecoration(subsection._id),
          }"
        >
          {{ subsection.name }}
        </h3>
        <h3
          @click="setSection(section)"
          style="cursor: pointer"
          :style="{
            textDecoration: textDecoration(section._id),
          }"
          class="lgray--text ml-8"
        >
          View all
        </h3>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>


<script>
export default {
  name: 'AccordionMenu',
  props: {
    categories: {
      type: Array,
      default: new Array(),
    },
    fullListOfCategories: {
      type: Array,
      default: new Array(),
    },
  },
  data() {
    return {
      currentIndex: null,
    };
  },
  computed: {
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
.header-expansion, .v-expansion-panel--active > .v-expansion-panel-header {
  min-height: 50px !important;
}
</style>