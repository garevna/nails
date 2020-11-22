<template>
  <v-card flat class="transparent" v-if="categories">
    <!-- <v-card-text v-for="(section, index) in categories" :key="index">
      <h3
        v-for="(subsection, ind) in section"
        :key="ind"
        style="cursor: pointer"
        @click="setSection(subsection)"
        class="gray-font"
      >
        {{ subsection.name }}
      </h3>
      <v-divider v-if="section.length > 1" class="gray-divider"></v-divider>
    </v-card-text>
    -->
    <v-row justify="center">
    <v-expansion-panels flat accordion>
      <v-expansion-panel
         v-for="(section, index) in categories" :key="index"
      >
        <v-expansion-panel-header class="text-body-1 gray-font font-weight-black" @click="setSection(section)">
        <span class="d-flex justify-start align-center">
        {{section.name}} <v-icon left v-if='section.subcategories.length'>mdi-menu-down</v-icon></span>
        </v-expansion-panel-header>
        <v-expansion-panel-content v-if='section.subcategories.length'>
          <h3
            v-for="(subsection, ind) in section.subcategories"
            :key="ind"
            style="cursor: pointer"
            @click="setSection(subsection)"
            class="gray-font text-body-1 ml-5 my-2 font-weight-bold"
             :style="{ textDecoration: activeCategory && activeCategory._id === subsection._id ? 'underline' : 'none' }"
          >
            {{ subsection.name }}
           </h3>
           <h3
            style="cursor: pointer"
            @click="setSection(section)"
            :style="{ textDecoration: activeCategory && activeCategory._id === section._id ? 'underline' : 'none' }"
            class="gray-font gray-font text-body-1 ml-15 my-2 font-weight-bold"
          >
            View all
           </h3>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-row>
  </v-card>
</template>

<style lang="scss" scoped>
@import '@/css/variables.scss';
.gray-font {
  color: $shopGrayFont;
}
.gray-divider {
  background-color: $shopGrayFont;
  max-width: 200px;
  margin: 10px 0 20px;
}
.v-expansion-panel--active > .v-expansion-panel-header {
    min-height: 50px !important;
}
</style>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Shop',

  props: ['setSelectedSection'],
  computed: {
    ...mapState('shop', ['categories', 'activeCategory'])
  },
  methods: {
    setSection (val) {
      this.setSelectedSection(val)
      if (this.$route.name === 'shop') {
        if (this.$route.params.categoryName !== val.slug) {
          this.$router.push({ name: 'shop', params: { categoryName: val.slug } })
        }
      } else {
        this.$router.push({ name: 'shop', params: { categoryName: val.slug } })
      }
    }
  }
}
</script>
