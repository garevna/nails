<template>
  <v-form ref="form" class="form mt-16">
    <div class="d-flex flex-column align-center">
      <h2>Change password</h2>
      <div class="input-container pa-4">
        <PasswordInput :value.sync="oldPassword" label="old password" :required="true" :outlined="false" />
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
import { mapState } from 'vuex';

export default {
  name: 'ChangePassword',
  components: {
    PasswordInput,
  },
  data() {
    return {
      oldPassword: '',
      password: '',
      confirmPassword: '',
    };
  },
  computed: {
    ...mapState('auth', ['loading']),
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('auth/CHANGE_PASSWORD', {
          password: Base64.stringify(sha256(this.password)),
        });
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