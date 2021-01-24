<template>
  <v-form ref="form" class="form mt-16">
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

        <!-- <v-text-field v-model="email" :rules="[rules.required]" label="Email" />
        <div class="input-pass">
          <v-text-field
            v-model="password"
            :type="showPass ? 'text' : 'password'"
            :rules="[rules.required]"
            label="password"
          />
          <v-checkbox label="Show" class="show-pass pa-0 ma-0" v-model="showPass">show</v-checkbox>
        </div> -->

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
        const startPath = this.$router.history._startLocation;
        const currentPath = this.$router.history.current.fullPath;
        startPath === currentPath ? this.$router.push({ name: 'home' }) : this.$router.go(-1);
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
  mounted() {},
  beforeDestroy() {},
};
</script>
