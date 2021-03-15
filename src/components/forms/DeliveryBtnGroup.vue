<template>
  <v-radio-group v-model="localType" row>
    <v-radio v-for="btn in btns" :key="btn.value" :label="btn.label" :value="btn.value"></v-radio>
  </v-radio-group>
</template>
<style scoped></style>
<script>
export default {
  name: 'DeliveryBtnGroup',
  props: {
    type: {
      type: String,
      required: true,
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
        return this.type
      },
      set(val) {
        this.$emit('update:type', val)
      }
    }
  },
  methods: {},
  mounted() {},
};
</script>
