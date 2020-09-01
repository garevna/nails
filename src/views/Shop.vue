<template>
  <v-container fluid fill-height class="whitefone shop-layout">
    <v-card flat class="transparent mx-auto" max-width="1440" width='100%'>
      <CategoriesSwitcher
        :section="section"
        :selectedSection="selectedSection"
        :selectedBlock="selectedBlock"
        :setSelectedSection="setSelectedSection"
        :mobileMenu="mobileMenu"
      ></CategoriesSwitcher>
      <v-row>
        <v-col cols="12" sm="6" md="3" xl="3" lg="3" v-if="!mobileMenu">
          <LeftSideMenu
            :section="section"
            :selectedSection="selectedSection"
            :selectedBlock="selectedBlock"
            :setSelectedSection="setSelectedSection"
          ></LeftSideMenu>
        </v-col>
        <v-col cols="12" sm="12" md="9" xl="9" lg="9">
          <v-row justify="start">
            <Card
              v-for="card in commodities"
              :key="card.id"
              :images="card.image"
              :name="card.name"
              :price="card.price"
              :description="card.description"
              :id="card.id"
            />
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

<style></style>

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
      selectedSection: { name: 'Cuticle nippers' },
      mobileMenu: window.innerWidth < 960
    }
  },
  computed: {
    ...mapState(['viewportWidth']),
    ...mapState('shop', ['categories', 'commodities']),
    pagination () {
      return {
        page: 1,
        total: 8
      }
    }
  },
  watch: {
    categories () {
      if (this.categories && this.categories[0] && this.categories[0][0] && this.categories[0][0]._id) {
        this.selectedSection = this.categories[0][0]
      }
    },
    selectedSection (val) {
      console.log('i am here')
      this.$store.dispatch('shop/GET_SHOP_COMODITIES', { categoryId: val._id })
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

  mounted () {
    this.selectedBlock = 0
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
