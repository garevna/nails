<template>
  <v-breadcrumbs :items="items" divider=">" large class="pa-0">
    <template v-slot:item="{ item }">
      <v-breadcrumbs-item :disabled="item.disabled">
        <router-link :to="item.slug" class="uppercase" :class="{ 'disabledPathBreadcrumbs--text': item.disabled }">
          {{ item.name }}
        </router-link>
      </v-breadcrumbs-item>
    </template>
  </v-breadcrumbs>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ShopBreadcrumbs',
  components: {},
  props: {
    disabled: { type: Boolean, default: false },
    mobile: { type: Boolean, default: false },
  },
  data() {
    return {};
  },
  computed: {
    ...mapState('shop', ['activeCategory', 'categories', 'commodity']),
    sucategories() {
      return this.categories.reduce((accum, current) => accum.concat(current.sucategories), []);
    },
    items() {
      return this.breadcrumbs.map((route, index, arr) =>
        Object.assign({ disabled: this.disabled || index === arr.length - 1 }, route)
      );
    },
    breadcrumbs() {
      let routes = [];
      if (!this.mobile) {
        routes = [
          {
            name: 'Home',
            slug: '/',
          },
          {
            name: 'Shop',
            slug: '/shop',
          },
        ];
      }

      if (!this.activeCategory) return routes;

      const active = {
        name: this.activeCategory.name,
        slug: `/shop/${this.activeCategory.slug}`,
      };

      if (Array.isArray(this.activeCategory.subcategories)) {
        // category
        routes.push(active);
      } else {
        const category = this.categories.find(item => item._id === this.activeCategory.parentId);
        if (category && !this.mobile)
          // category
          routes.push({
            name: category.name,
            slug: `/shop/${category.slug}`,
          });
        // subcutegory
        routes.push(active);
      }

      if (this.commodity)
        routes.push({
          name: this.commodity.name,
          slug: '*',
        });

      return routes;
    },
  },
  watch: {},
  methods: {},
  mounted() {},
};
</script>

<style scoped>
.uppercase {
  text-transform: uppercase;
}
</style>
