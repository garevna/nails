/* eslint-disable no-unused-vars */
<template>
  <v-text-field
    ref="email"
    :label="label"
    v-model.trim="localValue"
    :disabled="disabled"
    :rules="[rules.required, rules.email, rules.noRepeat]"
    :outlined="outlined"
  />
</template>

<script>
export default {
  name: 'EmailInput',
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

        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          const emailError = !pattern.test(value);
          return !value || !emailError || 'Please enter your email address in format: yourname@example.com';
        },

        noRepeat: value => {
          return (
            !this.noRepeat || value !== this.noRepeat || 'Email address and additional email address must not match'
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
      this.$refs.email.validate();
    },
  },
  methods: {
    showInput() {
      this.$emit('update:disabled', false);
    },
  },
};
</script>
