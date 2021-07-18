<template>
  <v-radio-group v-model="localType" :row="!isMobile">
    <v-radio
      v-for="btn in buttons"
      :key="btn.value"
      :label="btn.label"
      :value="btn.value"
      :disabled="btn.disabled"
    ></v-radio>
  </v-radio-group>
</template>

<script>
export default {
  name: 'DeliveryBtnGroup',
  props: {
    type: {
      type: String,
      required: true,
    },
    buttons: {
      type: Array,
      default: new Array(),
    },
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },

  computed: {
    localType: {
      get() {
        return this.type;
      },
      set(val) {
        this.$emit('update:type', val);
      },
    },
  },
};
</script>
