<template>
  <v-row justify="center">
    <v-col cols="12" md="8" lg="9" offset-lg="3" offset-md="4" offset="0" class="px-sm-10">
      <v-card
        width="100%"
        v-if="!isCategoriesLoading"
        class="transparent swithcer-header"
        tile
        rounded="0"
        shaped
        elevation="1"
      >
        <v-menu
          v-model="isOpened"
          :close-on-content-click="false"
          transition="slide-y-transition"
          bottom
          offset-y
          :disabled="!mobileMenu"
          :key="menuKey"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-card
              v-if="mobileMenu"
              color="lgrey"
              class="category-switcher-header d-flex justify-start flex-wrap px-4"
              expand-icon="mdi-menu-down"
              v-bind="attrs"
              v-on="on"
            >
              <ShopBreadcrumbs
                :disabled="true"
                :mobile="true"
                class="coursesGray--text font-weight-black text-h6 text-start w-100"
              />
            </v-card>

            <v-card v-else width="100%" color="lgrey" class="category-switcher-header px-2 d-flex justify-start">
              <ShopBreadcrumbs class="coursesGray--text font-weight-black text-h6 text-start w-100" />
            </v-card>
          </template>

          <v-row justify="center">
            <v-expansion-panels flat accordion class="px-0 py-5 homefone left-side-header mb-0" :key="panelsKey">
              <v-expansion-panel v-for="section in categories" :key="section._id">
                <v-expansion-panel-header
                  class="mb-0 py-0"
                  @click="!section.subcategories.length ? setSection(section) : null"
                >
                  <span class="d-flex justify-start align-center text-h5 font-weight-bold dgrey--text">
                    {{ section.name }}
                    <v-icon left v-if="section.subcategories.length">mdi-menu-down</v-icon>
                  </span>
                </v-expansion-panel-header>

                <v-expansion-panel-content class="justify-md-start justify-center" v-if="section.subcategories.length">
                  <v-row class="ma-0">
                    <v-col v-for="(subsection, ind) in section.subcategories" :key="ind" cols="12" class="pa-1 ma-0">
                      <span
                        @click="setSection(subsection)"
                        style="cursor: pointer"
                        class="lgray--text text-h6 ml-5 mb-2 font-weight-medium"
                        :style="{
                          textDecoration: textDecoration(subsection._id),
                        }"
                      >
                        {{ subsection.name }}
                      </span>
                    </v-col>

                    <v-col class="d-flex ma-0 mt-2 px-1 py-0">
                      <span
                        @click="setSection(section)"
                        style="cursor: pointer"
                        :style="{
                          textDecoration: textDecoration(section._id),
                        }"
                        class="lgray--text text-h6 font-weight-medium ml-5"
                      >
                        View all
                      </span>
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-row>
        </v-menu>
      </v-card>

      <v-card v-else width="100%" height="50px">
        <v-skeleton-loader height="100%" animation type="image"></v-skeleton-loader>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import ShopBreadcrumbs from '@/components/Shop/ShopBreadcrumbs.vue';

const mobileWidthLimit = 960;

export default {
  name: 'CategoriesSwitcher',
  components: { ShopBreadcrumbs },
  data() {
    return {
      isOpened: false,
      panelsKey: `${Math.random() * 1000}-key`,
      menuKey: `${Math.random() * 1000}-menu`,
    };
  },
  computed: {
    ...mapState(['viewportWidth']),
    ...mapState('shop', ['isCategoriesLoading', 'categories', 'commodities']),
    ...mapGetters('shop', ['fullListOfCategories']),
    activeCategory() {
      return this.fullListOfCategories.find(category => category.slug === this.$route.params.categoryName) ?? null;
    },
    mobileMenu() {
      return this.viewportWidth < mobileWidthLimit;
    },
  },
  watch: {
    mobileMenu() {
      this.menuKey = `${Math.random() * 1000}-menu`;
    },
  },
  methods: {
    setSection(section) {
      this.panelsKey = `${Math.random() * 1000}-key`;
      this.menuKey = `${Math.random() * 1000}-menu`;
      this.isOpened = !this.isOpened;
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

<style lang="scss">
.w-100 {
  width: 100% !important;
}
.swithcer-header {
  // .v-expansion-panel-header {
  //   padding-bottom: 0 !important;
  //   padding-top: 0 !important;
  // }
  .v-expansion-panel-content__wrap {
    padding-top: 0 !important;
    margin-top: 0;
  }
}
@media screen and (max-width: 400px) {
  .v-application .text-h6 {
    font-size: 1rem !important;
  }
  .v-application .text-h5 {
    font-size: 1.25rem !important;
  }
}
@import '@/css/variables.scss';
</style>
