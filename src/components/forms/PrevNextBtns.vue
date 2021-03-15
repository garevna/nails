<template>
  <v-card flat class="transparent">
    <v-card-actions>
      <v-spacer />
      <v-btn @click="$emit('prev')">
        <v-icon class="mr-1">{{ prevIcon }}</v-icon>
        {{ prevText }}
      </v-btn>
      <v-spacer />
      <v-btn @click="$emit('next')">
        {{ nextText }}
        <v-icon class="ml-1">{{ nextIcon }}</v-icon>
      </v-btn>
      <v-spacer />
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'PrevNextBtns',
  props: {
    prevText: {
      type: String,
      default: 'back',
    },
    nextText: {
      type: String,
      default: 'next',
    },
    prevIcon: {
      type: String,
      default: 'mdi-arrow-left',
    },
    nextIcon: {
      type: String,
      default: 'mdi-arrow-right',
    },
  },
};
</script>
