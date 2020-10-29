<template>
  <v-form ref="form" class="form mt-16">
    <div class="d-flex flex-column align-center">
      <h2>Sign in</h2>
      <div class="input-container pa-4">
        <v-text-field
          v-model="email"
          :rules="[rules.required]"
          label="Email or phone"
        />
        <div class="input-pass">
          <v-text-field
            v-model="password"
            :type="showPass ? 'text' : 'password'"
            :rules="[rules.required]"
            label="password"
          />
          <v-checkbox
            label="Show"
            class="show-pass pa-0 ma-0"
            v-model="showPass"
            >show</v-checkbox
          >
        </div>

        <v-checkbox
          v-model="isPoliticAgree"
          :rules="[rules.required]"
          label=" Agree to terms and conditions"
        ></v-checkbox>
      </div>
      <div class="d-flex">
        <v-btn
          @click="submit"
          color="buttons"
          rounded
          class="yellow-button"
          >sign in</v-btn
        >
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
  bottom:0;
  right: 0;
  & .v-label,
  .v-icon.v-icon {
    font-size: 14px !important;
  }
}
</style>
<script>
import { mapState } from 'vuex'

export default {
  name: 'login',
  data () {
    return {
      login: '',
      password: '',
      phone: '',
      email: '',
      isPoliticAgree: false,
      showPass: false,
      rules: {
        required: (v) => !!v || 'input is required',
        confirmPass: (v) => v === this.password || 'Passwords do not match',
        mailValidation: (v) =>
          /^(\w+\.?\w+\.?\w+?|\d+\.?\d+\.?\d+)([@])(\w+|\d+)\.{1}[a-zA-Z]{2,3}$/.test(
            v
          ) || 'invalid email'
      }
    }
  },
  computed: {
    ...mapState('auth', ['isLogged'])
  },
  watch: {
    isLogged (newVal) {
      if (newVal) {
        this.$router.push({ name: 'home' })
      }
    }
  },
  methods: {
    submit () {
      const {
        email,
        phone,
        role,
        isPoliticAgree,
        registration,
        login,
        password
      } = this
      if (this.$refs.form.validate()) {
        if (registration) {
          const data = {
            email,
            phone,
            login,
            role,
            isPoliticAgree,
            password
          }
          this.$store.dispatch('auth/REGISTRATION_USER', data)
        } else {
          this.$store.dispatch('auth/AUTHORIZATION_USER', { email, password })
        }
      }
    }

  }

}
</script>
