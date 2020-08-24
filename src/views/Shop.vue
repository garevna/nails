<template>
  <v-container fluid fill-height class="whitefone shop-layout">
    <v-card flat class="transparent mx-auto" max-width="1440">
      <CategoriesSwitcher
        :section="section"
        :selectedSection="selectedSection"
        :selectedBlock="selectedBlock"
        :setSelectedSection="setSelectedSection"
        :menuItems="menuItems"
        :mobileMenu="mobileMenu"
      ></CategoriesSwitcher>
      <v-row>
        <v-col cols="12" sm="6" md="3" xl="3" lg="3" v-if="!mobileMenu">
          <LeftSideMenu
            :section="section"
            :selectedSection="selectedSection"
            :selectedBlock="selectedBlock"
            :setSelectedSection="setSelectedSection"
            :menuItems="menuItems"
          ></LeftSideMenu>
        </v-col>
        <v-col cols="12" sm="12" md="9" xl="9" lg="9">
          <v-row class="flex-center">
            <Card v-for="(card, num) in cards" :key="num" :img="card.img" :name="card.name" :price="card.price" />
          </v-row>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-pagination
          v-model="pagination.page"
          :length="pagination.total"
          prev-icon="mdi-menu-left"
          next-icon="mdi-menu-right"
        ></v-pagination>
      </v-row>
    </v-card>
  </v-container>
</template>

<styles>

</styles>

<script>
import { mapState } from 'vuex'

import Card from '@/components/Shop/Card.vue'
import LeftSideMenu from '@/components/Shop/LeftSideMenu.vue'
import CategoriesSwitcher from '@/components/Shop/CategoriesSwitcher.vue'

export default {
  name: 'Shop',
  components: {
    Card,
    LeftSideMenu,
    CategoriesSwitcher
  },
  props: ['section'],
  data () {
    return {
      selectedBlock: 0,
      selectedSection: 'Cuticle nippers',
      mobileMenu: window.innerWidth < 960
    }
  },
  computed: {
    ...mapState(['commodities', 'viewportWidth']),
    menuItems () {
      return this.commodities.map((section) => Object.keys(section))
    },
    cards () {
      return this.commodities[this.selectedBlock][this.selectedSection].slice(0, 8)
    },
    pagination () {
      return {
        page: 1,
        total: this.cards.length / 4
      }
    }
  },
  methods: {
    setSelectedSection (val) {
      this.selectedSection = val
    },
    onResizeHandler () {
      this.mobileMenu = window.innerWidth < 960
    }
  },
  watch: {
    selectedSection (val) {
      this.selectedBlock = this.commodities.findIndex((item) => !!item[val])
    }
  },
  mounted () {
    this.selectedBlock = 0
    this.selectedSection = 'Cuticle nippers'
    this.$vuetify.theme.themes.light.homefone = this.$vuetify.theme.themes.light.whitefone
    this.mobileMenu = window.innerWidth < 960
    window.addEventListener('resize', this.onResizeHandler, { passive: true })
  },
  beforeDestroy () {
    this.$vuetify.theme.themes.light.homefone = this.$vuetify.theme.themes.light.secondaryGray
  }
}
</script>
