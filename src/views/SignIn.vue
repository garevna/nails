<template>
  <v-form ref="form" class="form" v-if="show">
    <div class="sign-in-container">
      <h2 class="text-center">Sign in</h2>
      <div class="input-container pa-4">
        <div v-for="(field, name) in schema" :key="name">
          <EmailInput
            v-if="field.type === 'email'"
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
        <p class="forgotPass--text text-center">
          Forgot password click <router-link to="/request-reset">here</router-link>
        </p>
      </div>
      <div class="d-flex justify-center">
        <v-btn @click="submit" color="buttons" rounded :disabled="loading" class="yellow-button">sign in</v-btn>
        <v-btn text @click="$router.push({name: 'sign-up'})" color="buttons" rounded :disabled="loading" class="yellow-button">sign up</v-btn>
      </div>
    </div>
  </v-form>
</template>

<script>
import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';
import { mapState } from 'vuex';
import EmailInput from '@/components/inputs/EmailInput.vue';
import PasswordInput from '@/components/inputs/PasswordInput.vue';

const schema = require('@/config/signInSchema').default;

export default {
  name: 'SignIn',
  components: {
    EmailInput,
    PasswordInput,
  },
  data() {
    return {
      show: false,
      schema,
      isPoliticAgree: false,
      data: Object.keys(schema).reduce((acc, key) => Object.assign(acc, { [key]: '' }), {}),
    };
  },
  computed: {
    ...mapState('auth', ['isLogged', 'loading']),
  },
  watch: {
    isLogged(newVal) {
      if (newVal) {
        this.$router.push({ name: 'user-cabinet' });
      } else {
        this.$router.push({ name: 'home' });
      }
    },
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        const data = Object.assign({}, this.data, {
          password: Base64.stringify(sha256(this.data.password)),
        });
        this.$store.dispatch('auth/SIGN_IN', data);
      }
    },
  },
  mounted() {
    if (this.isLogged && this.$route.name !== 'user-cabinet') {
      this.$router.push({ name: 'user-cabinet' });
    }

    setTimeout(() => {
        if (this.isLogged && this.$route.name !== 'user-cabinet') {
          this.$router.push({ name: 'user-cabinet' });
        } else {
          this.show = true;
        }
      }, 500);
  },
  beforeDestroy() {},
};
</script>

<style scoped>
.input-container {
  min-width: 350px;
}
.sign-in-container{
  position: fixed;
  top: 40%;
  left:50%;
  transform: translate(-50%,-40%);
}
</style>