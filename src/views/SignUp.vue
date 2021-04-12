<template>
  <v-form ref="form" class="form mt-16">
    <h2 class="text-center">Create an account</h2>
    <v-card flat class="d-flex flex-column align-center">
      <v-card flat class="pa-8" min-width="350px">
        <div class="d-flex">
          <div class="inputUp" v-for="(field, name) in schema.sideUp" :key="name">
            <TextInput
              v-if="field.type === 'text'"
              :value.sync="data[name]"
              :label="field.label"
              :required="field.required"
              :outlined="false"
            />
          </div>
        </div>

        <div v-for="(field, name) in schema.sideDown" :key="name">
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
        </div>
      </v-card>
      <v-checkbox v-model="isPoliticAgree" :rules="[rules.required]" label="Agree to terms and conditions"></v-checkbox>
      <v-btn @click="submit" color="buttons" :disabled="loading" rounded class="yellow-button mt-4"
        >Create account</v-btn
      >
    </v-card>
  </v-form>
</template>
<style scoped>
.inputUp:last-child {
  margin-left: 25px;
}
</style>
<script>
import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';
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
      data: Object.keys(schema.sideUp)
        .concat(Object.keys(schema.sideDown))
        .reduce(
          (acc, key) =>
            Object.assign(acc, {
              [key]: '',
            }),
          {}
        ),
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
          password: Base64.stringify(sha256(this.data.password)),
        });
        this.$store.dispatch('auth/SIGN_UP', data);
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.$store.state.auth.isLogged && vm.$router.push({ name: 'user-cabinet' }));
  },
};
</script>
