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
        >
          <template v-slot:activator="{ on, attrs }">
            <v-card
              v-if="mobileMenu"
              color="lgrey"
              class="d-flex justify-start flex-wrap px-4"
              expand-icon="mdi-menu-down"
              v-bind="attrs"
              v-on="on"
            >
              <ShopBreadcrumbs
                :disabled="true"
                :mobile="true"
                class="coursesGray--text font-weight-black text-h6 text-start"
              />
            </v-card>

            <v-card v-else width="100%" color="lgrey" class="category-switcher-header px-2 d-flex justify-start">
              <ShopBreadcrumbs class="coursesGray--text font-weight-black text-h6 text-start" />
            </v-card>
          </template>

          <v-row justify="center">
            <AccordionMenu
              v-if="mobileMenu && isOpened"
              :categories="categories"
              :fullListOfCategories="fullListOfCategories"
              @subClick="isOpened = false"
            />
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
import AccordionMenu from '@/components/Shop/AccordionMenu.vue';

const mobileWidthLimit = 960;

export default {
  name: 'CategoriesSwitcher',
  components: { ShopBreadcrumbs, AccordionMenu },
  data() {
    return {
      isOpened: false,
    };
  },
  computed: {
    ...mapState(['viewportWidth']),
    ...mapState('shop', ['isCategoriesLoading', 'categories', 'commodities']),
    ...mapGetters('shop', ['fullListOfCategories']),
    mobileMenu() {
      return this.viewportWidth < mobileWidthLimit;
    },
  },
};
</script>
