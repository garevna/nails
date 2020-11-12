<template>
  <v-form ref="form" class="form mt-16">
    <div class="d-flex flex-column align-center">
      <h2>Create an account</h2>
      <div class="input-container pa-4">
        <div class="d-flex">
          <v-text-field
            v-model="firstName"
            :rules="[rules.required]"
            label="First name"
            class="pr-4"
          />
          <v-text-field
            v-model="lastName"
            :rules="[rules.required]"
            label="Last name"
            class="pl-4"
          />
        </div>
        <v-text-field
          v-model="email"
          :rules="[rules.required, rules.mailValidation]"
          label="E-Mail"
        />
        <v-text-field
          v-model="phone"
          :rules="[rules.required]"
          label="Phone number"
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
        <!-- <v-text-field
          v-model="confirmPass"
          type="password"
          :rules="[rules.required, rules.confirmPass]"
          label="confirm password"
          outlined
          dark
        /> -->
        <!-- <v-text-field
          v-model="role"
          :rules="[rules.required]"
          label="Role"
        /> -->
        <v-checkbox
          v-model="isPoliticAgree"
          :rules="[rules.required]"
          label="Agree to terms and conditions"
        ></v-checkbox>
      </div>

      <div class="d-flex">
        <v-btn @click="submit" color="buttons" :disabled="loading" rounded class="yellow-button"
          >Create account</v-btn
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
  name: 'sign-up',
  data () {
    return {
      firstName: '',
      lastName: '',
      password: '',
      phone: '',
      role: 'User',
      // confirmPass: '',
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
    ...mapState('auth', ['isLogged']),
    ...mapState('auth', ['error']),
    ...mapState('auth', ['loading'])
  },
  watch: {
    isLogged (newVal) {
      if (newVal) {
        this.$router.push({ name: 'home' })
      }
    },
    error (val) {
      if (val) {
        this.$notify({
          group: 'foo',
          type: 'error',
          text: val
        })
      }
    },
    loading (val) {
      return val
    }
  },
  methods: {
    submit () {
      const { email, phone, role, isPoliticAgree, lastName, password, firstName } = this
      if (this.$refs.form.validate()) {
        const data = {
          email,
          phone,
          lastName,
          firstName,
          role,
          isPoliticAgree,
          password
        }
        this.$store.dispatch('auth/SIGN_UP', data)
        // } else {
        //   this.$store.dispatch('auth/AUTHORIZATION_USER', { email, password })
        // }
      }
    }
  }
}
</script>
