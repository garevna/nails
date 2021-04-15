<template>
  <v-radio-group v-model="localType" :row="!isMobile">
    <v-radio
      v-for="btn in btns"
      :key="btn.value"
      :label="btn.label"
      :value="btn.value"
      :disabled="disabledBtn"
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
    disabledBtn: {
      type: Boolean,
      default: false,
    },
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      btns: [
        {
          label: 'Pickup',
          value: 'pickup',
        },
        {
          label: 'Standard shipping Aus post',
          value: 'standard',
        },
        {
          label: 'Express shipping Aus post',
          value: 'express',
        },
        {
          label: 'International shipping ',
          value: 'international',
        },
      ],
    };
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
