<template>
  <v-card flat class="transparent">
    <v-card-text v-for="(section, index) in categories" :key="index">
      <h3
        v-for="(subsection, ind) in section"
        :key="ind"
        style="cursor: pointer"
        @click="setSelectedSection(subsection)"
        class="gray-font"
      >
        {{ subsection.name }}
      </h3>
      <v-divider v-if="section.length > 1" class="gray-divider"></v-divider>
    </v-card-text>
  </v-card>
</template>

<style lang="scss">
@import '@/css/variables.scss';
.gray-font {
  color: $shopGrayFont;
}
.gray-divider {
  background-color: $shopGrayFont;
  max-width: 200px;
  margin: 10px 0 20px;
}
</style>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Shop',

  props: ['section', 'selectedSection', 'selectedBlock', 'setSelectedSection'],
  computed: {
    ...mapState('shop', ['categories'])
  }
}
</script>
