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
            <Card
              v-for="card in commodities"
              :key="card.id"
              :images="card.image"
              :name="card.name"
              :price="card.price"
              :brand="card.brand"
              :id="card._id"
            />
          </v-row>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-pagination
          v-model="pagination.page"
          :length="pagination.total"
          @input="setPage"
          prev-icon="mdi-menu-left"
          next-icon="mdi-menu-right"
          class="pagination-buttons"
        ></v-pagination>
      </v-row>
    </v-card>
  </v-container>
</template>

<style  lang="scss">
.pagination-buttons {
  button {
    outline: none !important;
  }
}
</style>

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
  data () {
    return {
      selectedSection: {},
      categoryName: this.$route.params.categoryName
    }
  },
  computed: {
    ...mapState(['viewportWidth']),
    ...mapState('shop', ['categories', 'commodities', 'totalCommodities']),
    pagination () {
      const page = +this.$route.query.page
      return {
        page: !isNaN(page) ? page : 1,
        total: Math.ceil(this.totalCommodities / 8),
        skip: !isNaN(page) ? page * 8 - 8 : 0
      }
    },
    mobileMenu () {
      return this.viewportWidth < 960
    }
  },
  watch: {
    categories () {
      if (this.categories.length && !this.commodities.length) {
        const allcat = this.categories.flat()
        this.selectedSection = allcat.find((el) => el.name.replaceAll(' ', '-').toLowerCase() === this.categoryName)
        this.getCommodities()
      }
    }
  },
  methods: {
    setSelectedSection (val) {
      this.selectedSection = val
    },
    onResizeHandler () {
      this.mobileMenu = this.viewportWidth < 960
    },
    getCommodities () {
      this.$store.dispatch('shop/GET_SHOP_COMMODITIES', {
        categoryId: this.selectedSection._id,
        skip: this.pagination.skip
      })
    },
    setPage (page) {
      if (page !== this.$route.query.page) {
        this.$router.replace({ name: 'shop', params: { categoryId: this.categoryId }, query: { page } })
        this.pagination.page = page
        this.pagination.skip = page * 8 - 8
        this.getCommodities()
      }
    }
  },
  created () {},
  mounted () {
    if (!this.categories) this.$store.dispatch('shop/GET_SHOP_CATEGORIES')
    if (this.categories) {
      const allcat = this.categories.flat()
      this.selectedSection = allcat.find((el) => el.name.replaceAll(' ', '-').toLowerCase() === this.categoryName)
      this.getCommodities(this.pagination.skip)
    }
    // if (this.categories && this.categoryId) {
    //   const allcat = this.categories.flat()
    //   this.selectedSection = allcat.find((el) => el._id === this.categoryId)
    // }
    this.$vuetify.theme.themes.light.homefone = this.$vuetify.theme.themes.light.whitefone
  },
  beforeDestroy () {
    this.$vuetify.theme.themes.light.homefone = this.$vuetify.theme.themes.light.secondaryGray
  }
}
</script>
