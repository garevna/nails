<template>
  <v-container fluid fill-height class="whitefone shop-layout">
    <v-card flat class="transparent mx-auto" max-width="1440" width="100%">
      <CategoriesSwitcher
        :selectedSection="selectedSection"
        :setSelectedSection="setSelectedSection"
        :mobileMenu="mobileMenu"
      ></CategoriesSwitcher>
      <v-row>
        <v-col cols="12" sm="6" md="3" xl="3" lg="3" v-if="!mobileMenu">
          <LeftSideMenu :setSelectedSection="setSelectedSection"></LeftSideMenu>
        </v-col>
        <v-col cols="12" sm="12" md="9" xl="9" lg="9">
          <v-row justify="start">
            <v-col cols="6" sm="12" md="6" xl="6" lg="6"> </v-col>

            <v-col cols="6" sm="12" md="6" xl="6" lg="6"> </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<style></style>

<script>
import { mapState } from 'vuex'

import LeftSideMenu from '@/components/Shop/LeftSideMenu.vue'
import CategoriesSwitcher from '@/components/Shop/CategoriesSwitcher.vue'
export default {
  name: 'Shop',
  components: {
    LeftSideMenu,
    CategoriesSwitcher
  },
  props: ['section'],
  data () {
    return {
      selectedBlock: 0,
      mobileMenu: window.innerWidth < 960,
      selectedSection: {},
      commodityId: this.$route.params.commodityId
    }
  },
  computed: {
    ...mapState(['viewportWidth']),
    ...mapState('shop', ['categories', 'commodities', 'commodity'])
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
    categories () {
      if (this.categories && this.categories.length && this.commodity) {
        this.selectedSection = this.categories.flat().find((el) => el._id === this.commodity.categoryId)
      }
    },
    commodity () {
      if (this.categories && this.categories.length && this.commodity) {
        this.selectedSection = this.categories.flat().find((el) => el._id === this.commodity.categoryId)
      }
    }
  },
  mounted () {
    this.$store.dispatch('shop/GET_COMMODITY', { commodityId: this.commodityId })
    this.$vuetify.theme.themes.light.homefone = this.$vuetify.theme.themes.light.whitefone
    this.mobileMenu = window.innerWidth < 960
    window.addEventListener('resize', this.onResizeHandler, { passive: true })
  },
  beforeDestroy () {
    this.$vuetify.theme.themes.light.homefone = this.$vuetify.theme.themes.light.secondaryGray
    window.removeEventListener('resize', this.onResizeHandler)
  }
}
</script>
