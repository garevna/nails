<template>
  <v-form ref="form" class="form mt-16" v-if="show">
    <div class="d-flex flex-column align-center">
      <h2>Sign in</h2>
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
        <v-checkbox
          v-model="isPoliticAgree"
          :rules="[rules.required]"
          label=" Agree to terms and conditions"
        ></v-checkbox>
      </div>
      <div class="d-flex">
        <v-btn @click="submit" color="buttons" rounded :disabled="loading" class="yellow-button">sign in</v-btn>
      </div>
    </div>
  </v-form>
</template>
<style scoped>
.input-container {
  min-width: 350px;
}
</style>
<style lang="scss">
</style>
<script>
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
        // this.$router.push({ name: 'user-cabinet'})
        const startPath = this.$router.history._startLocation;
        const currentPath = this.$router.history.current.fullPath;
        startPath === currentPath ? this.$router.push({ name: 'user-cabinet' }) : this.$router.back();
      } else {
        this.$router.push({ name: 'home' });
      }
    },
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('auth/SIGN_IN', this.data);
      }
    },
  },
  mounted() {
    setTimeout(() => (this.show = true), 500);
  },
  beforeDestroy() {},
};
</script>
