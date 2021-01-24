<template>
  <v-form ref="form" class="form mt-16 mx-auto">
    <h2 class="text-center">Create an account</h2>
    <v-card flat width="400" class="d-flex flex-wrap justify-center  pa-4">
      <v-card flat v-for="(field, name, index) in schema" :key="name" :width="index < 2 ? 180 : 400" class="mx-auto">
        <TextInput
          v-if="field.type === 'text'"
          :value.sync="data[name]"
          :label="field.label"
          :required="field.required"
          :outlined="false"
        />
        <EmailInput
          v-if="field.type === 'email'"
          :value.sync="data[name]"
          :label="field.label"
          :required="field.required"
          :outlined="false"
        />
        <PhoneInput
          v-if="field.type === 'phone'"
          :value.sync="data[name]"
          :label="field.label"
          :required="field.required"
          :outlined="false"
        />
        <PasswordInput
          v-if="field.type === 'password'"
          :value.sync="data[name]"
          :label="field.label"
          :required="field.required"
          :outlined="false"
        />
      </v-card>
      <v-checkbox v-model="isPoliticAgree" :rules="[rules.required]" label="Agree to terms and conditions"></v-checkbox>
      <v-btn @click="submit" color="buttons" :disabled="loading" rounded class="yellow-button mt-4">Create account</v-btn>
    </v-card>
  </v-form>
</template>
<style scoped>
.input-container {
  min-width: 350px;
}
.input-pass {
  position: relative;
}
.form {
  position: fixed;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -25%);
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
import { mapState } from 'vuex';

import EmailInput from '@/components/inputs/EmailInput.vue';
import PasswordInput from '@/components/inputs/PasswordInput.vue';
import TextInput from '@/components/inputs/TextInput.vue';
import PhoneInput from '@/components/inputs/PhoneInput.vue';

const schema = require('@/config/signUpSchema').default;

export default {
  name: 'SignUp',
  components: {
    EmailInput,
    PasswordInput,
    TextInput,
    PhoneInput,
  },
  data() {
    return {
      schema,
      data: Object.keys(schema).reduce(
        (acc, key) =>
          Object.assign(acc, {
            [key]: '',
          }),
        {}
      ),
      // role: 'User',
      isPoliticAgree: false,
      rules: {
        required: v => !!v || 'input is required',
      },
    };
  },
  computed: {
    ...mapState('auth', ['isLogged', 'loading']),
  },
  watch: {
    isLogged(newVal) {
      if (newVal) {
        this.$router.push({ name: 'home' });
      }
    },
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        const data = Object.assign({}, this.data, {
          role: 'User',
          isPoliticAgree: this.isPoliticAgree,
        });
        this.$store.dispatch('auth/SIGN_UP', data);
      }
    },
  },
};
</script>
