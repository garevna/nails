<template>
  <v-card flat class="transparent d-flex">
    <v-card-actions>
      <v-btn v-if="!isLogged" @click="goTo('sign-in')" class="registration black--text" text> Sign in </v-btn>
      <v-btn v-if="!isLogged" @click="goTo('sign-up')" class="registration black--text" text> Sign up </v-btn>
      <CartBtn @click="goTo('products-cart')" />
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
    </v-card-actions>
  </v-card>
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

.menu-app-bar:not(:last-child),
.menu-item-app-bar:not(:last-child) {
  margin-right: 20px;
}
.item-link {
  width: 100%;
}

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

import CartBtn from '@/components/Shop/CartBtn.vue';

const { items } = require('@/config/menuSystemBarSchema').default;
export default {
  components: { CartBtn },
  data() {
    return {
      isOpened: false,
      key: 1,
      items,
    };
  },
  computed: {
    ...mapState('auth', ['isLogged']),
  },
  methods: {
    goTo(name) {
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
