<template>
  <v-card flat class="transparent">
    <v-card-text  v-for="(section, index) in menuItems" :key="index">
      <h3
        v-for="(subsection, ind) in section"
        :key="ind"
        style="cursor: pointer"
        @click="setSelectedSection(subsection)"
        class="gray-font"
      >
        {{ subsection }}
      </h3>
      <v-divider v-if="section.length > 1" class="gray-divider"></v-divider>
    </v-card-text>
  </v-card>
</template>

<styles>
</styles>

<script>

export default {
  name: 'Shop',
  props: ['section', 'selectedSection', 'selectedBlock', 'setSelectedSection', 'menuItems']

}
</script>
