<template>
  <v-textarea
    :label="label"
    v-model="localValue"
    :disabled="disabled"
    :rules="[rules.required, rules.limit]"
    :outlined="outlined"
    rows="8"
    no-resize
  />
</template>

<script>
export default {
  name: 'TextAreaInput',
  props: {
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
     limit: {
      type: Number,
      default: 200,
    },
    required: {
      type: Boolean,
      default: false,
    },
    outlined: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      rules: {
        required: v => {
          const a = this.required && !!v;
          const b = !this.required;
          // res = a XOR b
          const res = !(a && b) && (a || b);
          return res || 'Input is required';
        },
        limit : v => v.length <= this.limit || `Max ${this.limit} characters`,
      },
    };
  },
  computed: {
    localValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('update:value', val);
      },
    },
  },
  methods: {},
};
</script>
