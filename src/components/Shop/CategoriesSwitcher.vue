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
              {{ selectedSection }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <LeftSideMenu
                :section="section"
                :selectedSection="selectedSection"
                :selectedBlock="selectedBlock"
                :setSelectedSection="setNewCategory"
                :menuItems="menuItems"
              ></LeftSideMenu>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card>
    </v-col>
  </v-row>
</template>

<styles>
</styles>

<script>
import { mapState } from 'vuex'
import LeftSideMenu from '@/components/Shop/LeftSideMenu.vue'

export default {
  name: 'CategoriesSwithcer',
  components: { LeftSideMenu },
  props: ['section', 'selectedSection', 'selectedBlock', 'setSelectedSection', 'menuItems'],
  data () {
    return {
      isOpened: false
    }
  },
  computed: {
    ...mapState(['commodities', 'viewportWidth']),
    mobileMenu () {
      return this.viewportWidth < 960
    }
  },
  watch: {
    selectedSection (val) {
      this.selectedBlock = this.commodities.findIndex((item) => !!item[val])
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
