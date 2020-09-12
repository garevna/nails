<template>
  <div color="warning menu">
    <input class="search menu-app-bar" text />
    <v-btn icon>
      <v-icon color="secondaryGray">mdi-shopping</v-icon>
    </v-btn>
    <v-menu v-model="isOpened" bottom left :close-on-content-click="false">
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on" @click="isOpened = true">
          <v-icon color="secondaryGray">mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-treeview
        dark
        class="drop-down-menu"
        dense
        :items="items"
        open-on-click
      >
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
  /* color:yellow; */
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
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  /* flex-basis: 50%; */
  justify-content: flex-end;
}
.menu-app-bar {
  display: flex;
  padding: 0;
}
.menu-item-app-bar {
  display: flex;
  cursor: pointer;
  padding: 0 0;
  white-space: nowrap;
  flex-grow: 0;
}
.menu-item-search {
  display: flex;
  cursor: pointer;
  padding: 0 0;
  white-space: nowrap;
  flex-grow: 0;
}
.menu-app-bar:not(:last-child),
.menu-item-app-bar:not(:last-child) {
  margin-right: 20px;
}
.search {
  display: flex;
  margin: 10px 0 10px 0;
  width: 100px;
  flex-grow: 0;
  border: 1px solid #000;
  padding-left: 5px;
  outline: none;
  font-family: "Archivo Narrow";
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.1em;
}
.item-link {
  width: 100%;
}
.search:focus {
  width: 300px;
}
.drop-down-menu {
  background-color: #000;
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
export default {
  data () {
    return {
      isOpened: false,
      key: 1,
      items: [
        {
          id: 1,
          name: 'Shop',
          children: [
            {
              id: 2,
              name: 'Nippers',
              params: { categoryName: 'cuticle-nippers' },
              routeName: 'shop'
            },
            {
              id: 3,
              name: 'Scissors',
              params: { categoryName: 'cuticle-scissors' },
              routeName: 'shop'
            },
            {
              id: 4,
              name: 'Drill bits',
              params: { categoryName: 'diamond-drill-bits' },
              routeName: 'shop'
            },
            {
              id: 5,
              name: 'Brushers',
              params: { categoryName: 'brushes' },
              routeName: 'shop'
            },
            {
              id: 6,
              name: 'more...',
              children: [
                {
                  id: 7,
                  name: 'Cosmetics',
                  params: { categoryName: 'cosmetics' },
                  routeName: 'shop'
                },
                {
                  id: 8,
                  name: 'Promotions',
                  params: { categoryName: 'Promotions' },
                  routeName: 'shop'
                }
              ]
            }
          ]
        },
        {
          id: 9,
          name: 'NailsAustralia courses',
          children: [
            {
              id: 10,
              name: 'Online courses',
              routeName: 'courses-online'
            },
            {
              id: 11,
              name: 'Offline courses',
              routeName: 'courses-offline'
            }
          ]
        },
        {
          id: 12,
          name: 'All courses',
          routeName: 'courses'
        },
        {
          id: 13,
          name: 'Add courses',
          routeName: 'add-course'
        }
      ]
    }
  },
  methods: {
    openDialog (treeElem) {
      if (treeElem.routeName) {
        this.isOpened = false
        if (
          treeElem.routeName !== 'shop' &&
          this.$route.name !== treeElem.routeName
        ) {
          this.$router.push({
            name: treeElem.routeName,
            params: treeElem.params
          })
        } else if (
          treeElem.routeName === 'shop' &&
          this.$route.params.categoryName !== treeElem.params.categoryName
        ) {
          this.$router.push({
            name: treeElem.routeName,
            params: treeElem.params
          })
        }
      }
    }
  }
}
</script>
