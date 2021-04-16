<template>
  <v-form ref="form" class="form mt-16">
    <div class="d-flex flex-column align-center">
      <h2>Please, input your new password</h2>
      <div class="input-container pa-4">
        <PasswordInput :value.sync="password" label="password" :required="true" :outlined="false" />
        <PasswordInput
          :value.sync="confirmPassword"
          :confirm="password"
          label="confirm password"
          :required="true"
          :outlined="false"
        />
      </div>
      <div class="d-flex">
        <v-btn @click="submit" color="buttons" rounded :disabled="loading" class="yellow-button">submit</v-btn>
      </div>
    </div>
  </v-form>
</template>

<script>
import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';
import PasswordInput from '@/components/inputs/PasswordInput.vue';

export default {
  name: 'Reset',
  components: {
    PasswordInput,
  },
  data() {
    return {
      loading: false,
      password: '',
      confirmPassword: '',
    };
  },
  computed: {},
  watch: {},
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const isComplete = await this.$store.dispatch('auth/RESTORE', {
          code: this.$route.params.hash,
          password: Base64.stringify(sha256(this.password)),
        });
        this.loading = false;
        if (isComplete) this.$router.push({ name: 'sign-in' });
      }
    },
  },
};
</script>

<style scoped>
.input-container {
  min-width: 350px;
}
</style>>