<template>
  <v-row justify="center">
    <v-col cols="12" sm="0" md="4"></v-col>
    <v-col cols="12" sm="12" md="7">
      <v-card class="transparent">
        <v-expansion-panels flat :readonly="!mobileMenu" :value="isOpened" class="category-switcher">
          <v-expansion-panel>
            <v-expansion-panel-header
              class="category-switcher-header"
              expand-icon="mdi-menu-down"
              :hide-actions="!mobileMenu"
            >
              <h4>{{ nameToShow }}</h4>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <LeftSideMenu
                :setSelectedSection="setNewCategory"
                :nameToShow="nameToShow"
                :selectedSection="selectedSection"
              ></LeftSideMenu>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
import LeftSideMenu from '@/components/Shop/LeftSideMenu.vue'

export default {
  name: 'CategoriesSwithcer',
  components: { LeftSideMenu },
  props: ['selectedSection', 'setSelectedSection', 'mobileMenu', 'nameToShow'],
  data () {
    return {
      isOpened: false
    }
  },
  computed: {
    ...mapState(['viewportWidth']),
    ...mapState('shop', ['categories', 'commodities', 'selectedSectionName'])
  },
  watch: {
    mobileMenu () {
      this.isOpened = this.mobileMenu
    }
  },
  methods: {
    setNewCategory (val) {
      this.setSelectedSection(val)
      this.isOpened = !this.isOpened
    }
  }
}
</script>

<style lang="scss">
@import '@/css/variables.scss';
.category-switcher {
  .category-switcher-header {
    background-color: $lightGray;
  }
  button {
    min-height: 30px !important;
    padding: 10px !important;
  }
}
</style>
