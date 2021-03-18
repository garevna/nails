<template>
  <v-text-field
    ref="autocomplete-input"
    v-model="localValue"
    :label="label"
    :disabled="disabled"
    :rules="[rules.required]"
    :outlined="outlined"
  />
</template>

<script>
const loadScript = require('@/helpers/loadGoogleAutocomplete').default;
export default {
  name: 'InputWithAutocomplete',
  props: {
    value: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      default: 'au',
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
    outlined: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      ready: false,
      rules: {
        required: v => {
          const a = this.required && !!v;
          const b = !this.required;
          // res = a XOR b
          const res = !(a && b) && (a || b);
          return res || 'Input is required';
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
    country() {
      this.initAddressInputField();
    },
    localValue() {
      this.$emit('autocomplete', false);
    },
  },
  methods: {
    showInput() {
      this.$emit('update:disabled', false);
    },
    async testAddress() {
      const place = this.autocomplete.getPlace();
      this.localValue = place.formatted_address;
      setTimeout(() => this.$emit('autocomplete', true), 100);
    },
    async initAddressInputField() {
      try {
        const input = this.$refs['autocomplete-input'].$refs.input;
        const Autocomplete = this.maps().places.Autocomplete;
        this.autocomplete = new Autocomplete(input, { componentRestrictions: { country: this.country } });
      } catch (err) {
        console.warn(err);
        return;
      }
      this.autocomplete.addListener('place_changed', this.testAddress.bind(this));
    },
  },
  async mounted() {
    if (!this.maps()) await loadScript();
    this.initAddressInputField();
  },
};
</script>

<style></style>
