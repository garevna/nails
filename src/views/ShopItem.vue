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
        <v-col cols="12" sm="12" md="9" xl="9" lg="9" v-if="commodity">
          <v-row justify="start" class="description">
            <v-col cols="1" sm="1" md="1" xl="2" lg="2"> </v-col>

            <v-col cols="12" sm="6" md="4" xl="4" lg="4" xs="12" class='px-0'>
              <v-img :src="commodity.image[0]" max-width="100%" max-height="100%" contain></v-img>
            </v-col>

            <v-col cols="1" md="0"></v-col>

            <v-col cols="12" sm="12" md="5" xl="4" lg="4"  class='px-0'>
              <v-col cols="12" class="gray-font px-0" >
                <h2 class="dark-gray-font " >{{ commodity.name }}</h2>
                <h4>{{ commodity.description }}</h4>
                <div class="caption">
                  <h2>Working part diametr, mm: 2.3</h2>
                  <h2>Grain size: medium</h2>
                  <h2>Working part length, mm: 10.0</h2>
                  <h2>Shank diameter, mm: 2.3</h2>
                </div>
                <div class="price">
                  <h3 class="dark-gray-font">{{ commodity.price }} AUD</h3>
                  <div class="shop-buttons">
                    <v-btn tile small width="100%" class="add" color="#FFC44A">Add to card</v-btn>
                    <v-btn tile small width="100%" class="buy" color="#333333">Buy it now</v-btn>
                  </div>
                </div>
              </v-col>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<style lang="scss">
@import '@/css/variables.scss';
.caption {
  margin-top: 50px;
  h2 {
    margin-top: 5px;
  }
}
.shop-buttons {
  width: 100px;
  display: flex;
  flex-direction: column;
  button {
    margin: 4px 0;
  }
  .add {
    color: $darkGrayFont !important;
  }
  .buy {
    color: white !important;
  }
}
.price {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  h3 {
    margin: 25px 0;
  }
}
.dark-gray-font {
  color: $darkGrayFont;
}
.gray-font {
  color: $shopGrayFont;
}
.description {
  padding-top: 25px;
}
@media screen and (max-width: 320px) {
  .caption {
    h2 {
      font-size: 14px;
    }
  }
}
</style>

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
      console.log(this.commodity)
    }
  },
  mounted () {
    if (!this.categories) {
      this.$store.dispatch('shop/GET_SHOP_CATEGORIES')
    }
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
