<template>
  <v-container fluid fill-height class="whitefone shop-layout">
    <v-card flat class="transparent mx-auto" max-width="1440" width="100%">
     <Search/>
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
          <v-row justify="start" v-if="totalCommodities">
            <ShopCard
              v-for="card in commodities"
              :key="card.id"
              :image="card.previewImage[0] ? card.previewImage[0].link : ''"
              :name="card.name"
              :price="card.price"
              :brand="card.brand"
              :id="card._id"
              :handler="goToItem"
            />
          </v-row>
          <v-row v-else class="empty-message" align="center" justify="center">
            <h2>
              Unfortunately, there are no products <br />
              suitable for your request...
            </h2>
          </v-row>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-pagination
          v-if="totalCommodities"
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

<script>
import { mapState } from 'vuex'

// import Card from '@/components/Shop/Card.vue'
import LeftSideMenu from '@/components/Shop/LeftSideMenu.vue'
import CategoriesSwitcher from '@/components/Shop/CategoriesSwitcher.vue'
import Search from '@/components/Shop/Search.vue'
import 'nails-shop-card'

export default {
  name: 'Shop',
  components: {
    LeftSideMenu,
    CategoriesSwitcher,
    Search
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
    totalCommodities () {
      console.log(this.totalCommodities)
    },
    $route (to, from) {
      if (
        from.name === 'shop' &&
        to.params.categoryName !== from.params.categoryName
      ) {
        this.categoryName = to.params.categoryName
        this.getData()
      }
    }
  },
  methods: {
    async getData () {
      !this.categories &&
        (await this.$store.dispatch('shop/GET_SHOP_CATEGORIES'))
      const allcat = (await this.categories.length) && this.categories.flat()
      !this.categoryName &&
        (await this.$router.replace({
          name: 'shop',
          params: { categoryName: allcat[0].slug }
        }))
      this.categoryName = (await this.categoryName)
        ? this.categoryName
        : allcat[0].slug
      this.selectedSection =
        (await allcat.length) &&
        allcat.find((el) => el.slug === this.categoryName);
      (await this.selectedSection) && this.getCommodities()
    },
    setSelectedSection (val) {
      this.selectedSection = val
    },
    getCommodities () {
      this.$store.dispatch('shop/GET_SHOP_COMMODITIES', {
        categoryId: this.selectedSection._id,
        skip: this.pagination.skip
      })
    },
    setPage (page) {
      if (page !== this.$route.query.page) {
        this.$router.replace({
          name: 'shop',
          params: { categoryId: this.categoryId },
          query: { page }
        })
        this.pagination.page = page
        this.pagination.skip = page * 8 - 8
        this.getCommodities()
      }
    },
    goToItem (id) {
      this.$router.push({
        name: 'shop-item',
        params: {
          commodityId: id
        }
      })
    }
  },
  created () {
    this.getData()
    // this.$vuetify.theme.themes.light.homefone = this.$vuetify.theme.themes.light.whitefone
  },
  beforeDestroy () {
    // this.$vuetify.theme.themes.light.homefone = this.$vuetify.theme.themes.light.secondaryGray
    this.$store.commit('shop/CLEAR_COMMODITIES')
  }
}
</script>

<style lang="scss">
@import "@/css/variables.scss";
.pagination-buttons {
  button {
    outline: none !important;
  }
}
.empty-message {
  height: 100%;
  text-align: center;
  color: $shopGrayFont;
}
.shop-card {
  background-color: #f4f4f4;
  margin: 20px;
  width: calc(25% - 65px);
  height: 350px;
}
.price-wrap {
  padding: 5px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}
.text-wrap {
  padding: 10px;
  flex: 1;
}
.color-black {
  color: black;
}
.gray-background {
  background-color: #f4f4f4;
}
@media screen and (max-width: 1450px) {
  .shop-card {
    margin: 10px;
    width: calc(33% - 65px);
  }
}
@media screen and (max-width: 1095px) {
  .shop-card {
    margin: 10px;
    width: calc(50% - 65px);
  }
}
@media screen and (max-width: 569px) {
  .shop-card {
    margin: 10px;
    width: -webkit-fill-available;
  }
}
</style>
