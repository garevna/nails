<template>
  <div color="warning menu">
    <input class="search menu-app-bar"/>
    <v-menu bottom left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-treeview dark class="drop-down-menu" dense :items="items"></v-treeview>
    </v-menu>
  </div>
</template>
<style>
.v-treeview-node__label {
  cursor: pointer;
  /* color:yellow; */
}
.v-treeview-node__root .v-treeview-node__content{
  cursor: pointer;
  color:yellow;
}
.v-treeview-node__children {
  color:#fff;
}
/* .v-treeview-node__root:first-child{
  flex-direction: row-reverse;
} */
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
  /* height: 20px; */
  flex-grow: 0;
  /* flex-basis: 50px; */
  border: 1px solid #000;
  padding-left: 5px;
  outline: none;
}
.search:focus {
  /* transform: scale(1.2); */
  flex-grow: 1;
}
.drop-down-menu{
  background-color: #000;
}
</style>
<script>
export default {
  data () {
    return {
      items: [
        {
          id: 1,
          name: 'Shop',
          children: [
            { id: 2, name: 'Nippers' },
            { id: 3, name: 'Scissors' },
            { id: 4, name: 'Drill bits' },
            { id: 5, name: 'Brushers' },
            {
              id: 6,
              name: 'more...',
              children: [
                { id: 7, name: 'Cosmetics' },
                { id: 8, name: 'Promotions' }
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
              name: 'Online courses'
            },
            {
              id: 11,
              name: 'Offline courses'
            }
          ]
        },
        {
          id: 12,
          name: 'All courses'
        },
        {
          id: 13,
          name: 'Add courses'
        }
      ]
    }
  }
}
</script>
