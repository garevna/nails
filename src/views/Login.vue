<template>
  <v-form ref="form" class="form mt-16">
    <div class="d-flex flex-column align-center input_wrap">
      <div v-if="!registration">
        <v-text-field
          v-model="email"
          :rules="[rules.required]"
          label="E-Mail"
          outlined
          dark
        />
        <v-text-field
          v-model="password"
          type="password"
          :rules="[rules.required]"
          label="password"
          outlined
          dark
        />
      </div>
      <div v-if="registration">
        <v-text-field
          v-model="email"
          :rules="[rules.required, rules.mailValidation]"
          label="E-Mail"
          outlined
          dark
        />
        <v-text-field
          v-model="password"
          type="password"
          :rules="[rules.required]"
          label="password"
          outlined
          dark
        />
        <v-text-field
          v-model="confirmPass"
          type="password"
          :rules="[rules.required, rules.confirmPass]"
          label="confirm password"
          outlined
          dark
        />
        <v-text-field
          v-model="login"
          :rules="[rules.required]"
          label="login"
          outlined
          dark
        />
        <v-text-field
          v-model="phone"
          :rules="[rules.required]"
          label="phone"
          outlined
          dark
        />
        <v-text-field
          v-model="role"
          :rules="[rules.required]"
          label="Role"
          outlined
          dark
        />
        <v-checkbox
          v-model="isPoliticAgree"
          :rules="[rules.required]"
          label="Agree to privacy policy"
          outlined
          dark
        ></v-checkbox>
      </div>

      <div v-if="!registration" class="mb-8">
        <a>forget password?</a>
      </div>
      <div class="d-flex">
        <v-btn @click="submit" color="buttons" dark class=" yellow-button mr-8">{{ submitText }}</v-btn>
        <a @click.prevent="refHandler" class="d-flex align-center">{{
          refText
        }}</a>
      </div>
    </div>
  </v-form>
</template>
<style scoped>
/* .form {
  position: relative;
  width: 100%;
  height: 100%;
}
.input_wrap {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
} */
</style>
<script>
import { mapState } from 'vuex'

export default {
  props: ['type'],
  name: 'login',
  data () {
    return {
      login: '',
      password: '',
      phone: '',
      role: '',
      confirmPass: '',
      email: '',
      isPoliticAgree: false,
      registration: false,
      submitText: 'Login',
      refText: 'Registration',
      rules: {
        required: v => !!v || 'input is required',
        confirmPass: v => v === this.password || 'Passwords do not match',
        mailValidation: v =>
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
    },
    refHandler () {
      this.registration = !this.registration
      const temp = this.submitText
      this.submitText = this.refText
      this.refText = temp
    },
    remindPassHandler () {
    // push to path
    }
  }
}
</script>
