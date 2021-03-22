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
import { mapState, mapGetters } from 'vuex';

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
    ...mapState('shop', ['categories', 'commodity']),
    ...mapGetters('shop', ['fullListOfCategories']),
    activeCategory() {
      return this.fullListOfCategories.find(category => category.slug === this.$route.params.categoryName);
    },
    route() {
      return this.$route;
    },
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

      const home = { name: 'Home', slug: '/' };

      const shop = { name: 'Shop', slug: '/shop' };

      const active = {
        name: this.activeCategory?.name ?? 'Missing category',
        slug: `/shop/${this.activeCategory?.slug ?? 'missing-category'}`,
      };

      let category = null;
      let subcategory = null;

      if (Array.isArray(this.activeCategory?.subcategories)) {
        category = active;
      } else {
        const cat = this.categories.find(item => item._id === this.activeCategory?.parentId);
        category = { name: cat?.name ?? 'Missing category', slug: `/shop/${cat?.slug ?? 'missing-category'}` };
        subcategory = active;
      }

      const commodity = {
        name: this.commodity?.name ?? '',
        slug: '',
      };

      if (this.$route.name === 'shop-root') {
        return [home, shop];
      }

      if (!this.mobile) {
        routes = routes.concat([home, shop, category]);

        if (subcategory) routes.push(subcategory);

        if (this.$route.name === 'shop-item') {
          routes.push(commodity);
        }

        return routes;
      }

      // mobile version
      if (this.$route.name === 'shop-item') {
        routes.push(category);

        if (subcategory) routes.push(subcategory);

        routes.push(commodity);
      } else {
        if (!subcategory) routes.push(shop);

        routes.push(category);

        if (subcategory) routes.push(subcategory);
      }

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
