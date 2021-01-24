<template>
  <!-- :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'" -->
  <!-- @click:append="showPass = !showPass" -->
  <div class="input-pass">
    <v-text-field
      ref="pass"
      v-model="localValue"
      :disabled="disabled"
      :label="label"
      :type="showPass ? 'text' : 'password'"
      :rules="[rules.required, rules.confirm, rules.noRepeat, rules.equal]"
      :outlined="outlined"
    />
    <v-checkbox label="Show" class="show-pass pa-0 ma-0" v-model="showPass">show</v-checkbox>
  </div>
</template>

<style scoped>
.input-pass {
  position: relative;
}
</style>
<style lang="scss">
.show-pass {
  position: absolute;
  bottom: 0;
  right: 0;
  & .v-label,
  .v-icon.v-icon {
    font-size: 14px !important;
  }
}
</style>

<script>
export default {
  name: 'PasswordInput',
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
    confirm: {
      type: String,
      default: '',
    },
    noRepeat: {
      type: String,
      default: '',
    },
    equal: {
      type: Boolean,
      default: true,
    },
    outlined: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      showPass: false,
      rules: {
        required: v => {
          const a = this.required && !!v;
          const b = !this.required;
          // res = a XOR b
          const res = !(a && b) && (a || b);
          return res || 'Input is required';
        },

        minPass: v => v.length >= 8 || 'Min 8 characters',

        confirm: value => {
          return !this.confirm || value === this.confirm || 'Password confirmation must match password';
        },

        noRepeat: value => {
          return !this.noRepeat || value !== this.noRepeat || 'Old and new password must not match';
        },

        equal: () => this.equal || 'Wrong password',
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
    confirm() {
      if (!this.localValue) return;
      this.$refs.pass.validate();
    },
    equal() {
      this.$refs.pass.validate();
    },
  },
  methods: {
    showInput() {
      this.$emit('update:disabled', false);
    },
  },
};
</script>

<style>
</style>
