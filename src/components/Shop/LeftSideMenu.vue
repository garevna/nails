<template>
  <v-card flat class="transparent" v-if="categories">
    <v-row justify="center">
      <v-expansion-panels flat accordion>
        <v-expansion-panel v-for="(section, index) in categories" :key="index">
          <v-expansion-panel-header @click="setSection(section)" class="d-flex">
            <h3 class="text-body-1 gray-font font-weight-black">{{section.name}} <v-icon v-if="section.subcategories.length">mdi-menu-down</v-icon></h3>

          </v-expansion-panel-header>
          <v-expansion-panel-content v-if="section.subcategories.length">
            <h3
              v-for="(subsection, ind) in section.subcategories"
              :key="ind"
              style="cursor: pointer"
             :style="{ textDecoration: selectedSectionId === subsection._id ? 'underline' : 'none' }"
              @click="setSection(subsection, section.name)"
              class="gray-font text-body-1 ml-5 my-2 font-weight-bold"
            >{{ subsection.name }}</h3>
            <h3
              style="cursor: pointer"
              @click="setSection(section)"
              :style="{ textDecoration: selectedSectionId === section._id ? 'underline' : 'none' }"
              class="gray-font gray-font text-body-1 ml-15 my-2 font-weight-bold"
            >View all</h3>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Shop',
  props: ['setSelectedSection'],
  computed: {
    ...mapState('shop', ['categories', 'selectedSectionId'])
  },
  methods: {
    setSection (section, parentName) {
      this.setSelectedSection(section)
      const fullName = parentName ? `${parentName} > ${section.name}` : `${section.name} > View all`
      this.$store.dispatch('shop/SET_SELECTED_SECTION', {
        name: fullName,
        id: section._id
      })
      if (this.$route.name === 'shop') {
        if (this.$route.params.categoryName !== section.slug) {
          this.$router.push({
            name: 'shop',
            params: { categoryName: section.slug }
          })
        }
      } else {
        this.$router.push({ name: 'shop', params: { categoryName: section.slug } })
      }
    }
  }
}
</script>

<style lang="scss">
@import "@/css/variables.scss";
.gray-font {
  color: $shopGrayFont;
}
.gray-divider {
  background-color: $shopGrayFont;
  max-width: 200px;
  margin: 10px 0 20px;
}
</style>
