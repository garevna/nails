<template>
  <v-breadcrumbs :items="items" divider=">" large class="pa-0 text-truncate">
    <template v-slot:item="{ item }">
      <v-breadcrumbs-item :disabled="item.disabled">
        <router-link
          :to="item.slug"
          class="text-uppercase text-h6 font-weight-black text-decoration-none"
          :class="{ 'disabledPathBreadcrumbs--text': item.disabled }"
        >
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
        if (cat) {
          category = { name: cat.name, slug: `/shop/${cat.slug}` };
          subcategory = active;
        }
      }

      const commodity = {
        name: this.commodity?.name ?? '',
        slug: '',
      };

      if (this.$route.name === 'shop-root') {
        return [home, shop];
      }

      if (!this.mobile) {
        routes = routes.concat([home, shop]);

        if (category) routes.push(category);

        if (subcategory) routes.push(subcategory);

        if (this.$route.name === 'shop-item') routes.push(commodity);

        return routes;
      }

      // mobile version
      if (this.$route.name === 'shop-item') {
        if (category) routes.push(category);

        if (subcategory) routes.push(subcategory);

        routes.push(commodity);
      } else {
        if (!subcategory) routes.push(shop);

        if (category) routes.push(category);

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

