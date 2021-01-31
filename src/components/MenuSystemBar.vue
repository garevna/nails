<template>
  <div color="warning" class="d-lg-flex flex-row flex-nowrap justify-end">
    <v-btn v-if="!isLogged" @click="goToLogin('sign-in')" class="registration black--text" text> Sign in </v-btn>
    <v-btn v-if="!isLogged" @click="goToLogin('sign-up')" class="registration black--text" text> Sign up </v-btn>
    <ProductsCart />
    <v-btn icon v-if="isLogged" @click="goToCabinet">
      <v-icon color="secondaryGray">mdi-account</v-icon>
    </v-btn>

    <v-menu v-model="isOpened" bottom left :close-on-content-click="false">
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on" @click="isOpened = true">
          <v-icon color="secondaryGray">mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-treeview dark class="black pt-5" dense :items="items" open-on-click>
        <template slot="label" slot-scope="{ item }">
          <a @click="openDialog(item)" class="item-link">{{ item.name }}</a>
        </template>
      </v-treeview>
    </v-menu>
  </div>
</template>
<style>
.v-treeview-node__label {
  cursor: pointer;
}
.v-treeview-node__root .v-treeview-node__content {
  cursor: pointer;
  color: yellow;
}
.v-treeview-node__children {
  color: #fff;
}
</style>
<style scoped>
.menu {
  /* display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end; */
}
/* .menu-app-bar {
  display: flex;
  padding: 0;
}
.menu-item-app-bar {
  display: flex;
  cursor: pointer;
  padding: 0 0;
  white-space: nowrap;
  flex-grow: 0;
} */
/* .menu-item-search {
  display: flex;
  cursor: pointer;
  padding: 0 0;
  white-space: nowrap;
  flex-grow: 0;
} */
.menu-app-bar:not(:last-child),
.menu-item-app-bar:not(:last-child) {
  margin-right: 20px;
}
/* .search {
  display: flex;
  margin: 10px 0 10px 0;
  width: 100px;
  flex-grow: 0;
  border: 1px solid #000;
  padding-left: 5px;
  outline: none;
  font-family: 'Archivo Narrow';
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.1em;
} */
.item-link {
  width: 100%;
}
/* .search:focus {
  width: 300px;
} */
/* .drop-down-menu {
  background-color: #000;
} */
.registration {
  /* color: #000 !important; */
  font-size: 18px !important;
}
@media screen and (max-width: 1330px) {
  .search:focus {
    width: 250px;
  }
}
@media screen and (max-width: 1230px) {
  .search:focus {
    width: 200px;
  }
}
@media screen and (max-width: 1030px) {
  .search:focus {
    width: 150px;
  }
}
</style>
<script>
import { mapState } from 'vuex';

import ProductsCart from '@/components/Shop/ProductsCart.vue';
const { items } = require('@/config/menuSystemBarSchema').default
export default {
  components: { ProductsCart },
  data() {
    return {
      isOpened: false,
      key: 1,
      items
    };
  },
  computed: {
    ...mapState('auth', ['isLogged']),
  },
  methods: {
    goToLogin(name) {
      if (this.$route.name !== name) this.$router.push({ name });
    },
    goToCabinet() {
      if (this.$route.name !== 'user-cabinet') this.$router.push({ name: 'user-cabinet' });
    },
    openDialog(treeElem) {
      if (treeElem.name === 'Logout') {
        this.dialog = true;
      }
      if (treeElem.routeName) {
        this.isOpened = false;
        if (treeElem.routeName !== 'shop' && this.$route.name !== treeElem.routeName) {
          this.$router.push({
            name: treeElem.routeName,
            params: treeElem.params,
          });
        } else if (treeElem.routeName === 'shop' && this.$route.params.categoryName !== treeElem.params.categoryName) {
          this.$router.push({
            name: treeElem.routeName,
            params: treeElem.params,
          });
        }
      }
    },
  },
};
</script>
