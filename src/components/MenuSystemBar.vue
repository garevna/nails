<template>
  <v-card flat class="transparent d-flex">
    <v-card-actions>
      <v-btn text v-if="!isLogged" @click="goTo('sign-in')" class="black--text"> Sign in </v-btn>
      <v-btn text v-if="!isLogged" @click="goTo('sign-up')" class="black--text"> Sign up </v-btn>
      <CartBtn @click="goTo('products-cart')" />
      <v-btn text v-if="isLogged" class="black--text" @click="goToCabinet">
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-menu
        v-model="isOpened"
        bottom
        left
        :close-on-content-click="false"
        content-class="elevation-24"
        :elevation="24"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn text v-bind="attrs" class="black--text" v-on="on" @click="isOpened = true">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-treeview
          dark
          class="secondaryGray primary--text"
          dense
          :items="menuTree"
          open-on-click
          item-text="name"
          @update:active="openDialog"
          activatable
        >
          <!-- <template v-slot:label="{ on, attrs, item }">
            <div v-bind="attrs" v-on="on" @click="openDialog(item)" style="width: 100%; heigth: 100%">
              <a class="primary--text">{{ item.name }}</a>
            </div>
          </template> -->
        </v-treeview>
      </v-menu>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';

import CartBtn from '@/components/Shop/CartBtn.vue';

const { items } = require('@/config/menuSystemBarSchema').default;

export default {
  components: { CartBtn },
  data() {
    return {
      isOpened: false,
      key: 1,
    };
  },
  computed: {
    ...mapState('auth', ['isLogged']),
    ...mapState('shop', ['categories']),
    menuTree() {
      const children1 = this.categories.slice(0, 6);
      const children2 = this.categories.slice(6);
      items[0].children = children1.map(item => ({
        id: item._id,
        name: item.name,
        params: {
          categoryName: item.slug,
        },
        routeName: 'shop',
      }));
      if (children2.length !== 0) {
        items[0].children.push({
          id: 6,
          name: 'more...',
          children: children2.map(item => ({
            id: item._id,
            name: item.name,
            params: {
              categoryName: item.slug,
            },
            routeName: 'shop',
          })),
        });
      }
      return items;
    },
    flatMenu() {
      let arr = [];
      function newPeremennaya(items) {
        arr = arr.concat(items);
        items.forEach(item => {
          if (Array.isArray(item.children) && item.children.length) {
            newPeremennaya(item.children);
          }
        });
      }

      newPeremennaya(this.menuTree);

      return arr;
    },
  },
  methods: {
    goTo(name) {
      if (this.$route.name !== name) this.$router.push({ name });
    },
    goToCabinet() {
      if (this.$route.name !== 'user-cabinet') this.$router.push({ name: 'user-cabinet' });
    },
    openDialog([id]) {
      const current = this.flatMenu.find(item => item.id === id);
      if (!current || !current.routeName) {
        return;
      }
      const { routeName: name, params } = current;
      if (!(this.$route.name === name && this.$route.params?.categoryName === params?.categoryName)) {
        this.$router.push({ name, params });
      }

      this.isOpened = false;
    },
  },
};
</script>
