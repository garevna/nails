<template>
  <v-container fluid fill-height class="homefone">
    <v-row>
      <v-col cols="12" sm="6" md="4"></v-col>
      <v-col cols="12" sm="6" md="8">
        <v-card dark class="transparent">
          <v-card-text>
            <h2>{{ selectedSection }}</h2>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="4">
        <v-card flat dark class="transparent">
          <v-card-text
              v-for="(section, index) in menuItems"
              :key="index"
              dark
          >
            <h3
                v-for="(subsection, ind) in section"
                :key="ind"
                @click="selectedSection = subsection"
            >
                {{ subsection }}
            </h3>
            <v-divider></v-divider>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="8">
        <v-row>
            <Card
                v-for="(card, num) in cards"
                :key="num"
                :img="card.img"
                :name="card.name"
                :price="card.price"
            />
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<styles>

</styles>

<script>

import { mapState } from 'vuex'

import Card from '@/components/Card.vue'

export default {
  name: 'Shop',
  components: {
    Card
  },
  props: ['section'],
  data () {
    return {
      selectedBlock: 0,
      selectedSection: 'Cuticle nippers'
    }
  },
  computed: {
    ...mapState(['commodities']),
    menuItems () {
      return this.commodities.map(section => Object.keys(section))
    },
    cards () {
      console.log(this.commodities[this.selectedBlock][this.selectedSection])
      return this.commodities[this.selectedBlock][this.selectedSection]
    }
  },
  watch: {
    selectedSection (val) {
      console.log(this.commodities.findIndex(item => !!item[val]))
      this.selectedBlock = this.commodities.findIndex(item => !!item[val])
    }
  },
  mounted () {
    this.selectedSection = this.commodities[0]['Cuticle nippers']
  }
}
</script>
