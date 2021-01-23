<template>
  <v-text-field
    ref="number"
    v-model="localValue"
    :label="label"
    :disabled="disabled"
    :rules="[rules.required, rules.phone, rules.noRepeat]"
    outlined
  />
</template>

<script>
export default {
  name: 'NumberInput',
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
    required: {
      type: Boolean,
      default: false,
    },
    noRepeat: {
      type: String,
      default: '',
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
        phone: value => {
          const pattern = /^[0-9]{10,12}$/gm;
          const phoneError = !pattern.test(value.split(' ').join(''));
          return !value || !phoneError || 'Invalid phone number';
        },
        noRepeat: value => {
          return (
            !this.noRepeat || value.split(' ').join('') !== this.noRepeat.split(' ').join('') || 'Digits must not match'
          );
        },
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
  watch: {
    noRepeat() {
      this.$refs.number.validate();
    },
  },
  methods: {
    showInput() {
      this.$emit('update:disabled', false);
    },
  },
};
</script>

<style></style>
