<template>
  <v-form ref="form">
    <v-container>
      <!-- <v-row justify="center" align="center" align-content="center" class="flex-column"> -->
      <v-row>
        <v-col cols="12" offset-sm="4" sm="4">
          <v-text-field
            v-model="email"
            :rules="[rules.required, rules.mailValidation]"
            label="E-mail"
            outlined
            dark
          ></v-text-field>
        </v-col>
        <v-col cols="12" offset-sm="4" sm="4">
          <v-text-field
            v-model="phone"
            :rules="[rules.required, rules.phoneValidation]"
            label="Phone number"
            outlined
            dark
          ></v-text-field>
        </v-col>
        <v-col cols="12" offset-sm="4" sm="4">
          <v-text-field
            v-model="fullName"
            :rules="[rules.required]"
            label="Full name"
            outlined
            dark
          ></v-text-field>
        </v-col>
        <v-col cols="12" offset-sm="4" sm="4">
          <v-textarea v-model="message" label="Message" outlined dark no-resize></v-textarea>
        </v-col>
        <v-col cols="12" offset-sm="4" sm="4">
          <v-checkbox
            v-model="checkbox"
            :rules="[rules.required]"
            label="Agree to privacy policy"
            dark
          ></v-checkbox>
        </v-col>
        <v-col cols="12" style="text-align:center">
          <v-btn
            color="buttons"
            rounded
            outlined
            small
            dark
            min-width="90"
            class="yellow-button mt-4"
            @click="checkForm"
          >submit</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
<style scoped>
/* .v-text-field {
  min-width: 300px;
} */
</style>
<script>
export default {
  name: 'personal-data',
  data () {
    return {
      fullName: '',
      email: '',
      phone: '',
      message: '',
      checkbox: '',
      rules: {
        required: (v) => !!v || 'input is required',
        minLengthName: (v) => v.length <= 15 || 'the maximum number of characters entered',
        mailValidation: (v) =>
          /^(\w+\.?\w+\.?\w+?|\d+\.?\d+\.?\d+)([@])(\w+|\d+)\.{1}[a-zA-Z]{2,3}$/.test(v) || 'invalid email',
        phoneValidation: (v) =>
          /^\({0,1}((0|\+61)(2|4|3|7|8)){0,1}\){0,1}( |-){0,1}[0-9]{2}( |-){0,1}[0-9]{2}( |-){0,1}[0-9]{1}( |-){0,1}[0-9]{3}$/.test(
            v
          ) || 'invalid number'
      }
    }
  },

  methods: {
    sendData () {
      this.$store.dispatch('', {
        fullName: this.fullName,
        email: this.email,
        phone: this.phone,
        message: this.message
      });

      ['fullName', 'email', 'phone', 'message', 'checkbox'].forEach((item) => { this[item] = '' })
    },
    checkForm () {
      if (this.$refs.form.validate()) {
        this.sendData()
        this.$router.push('/payment-details')
      }
    }
  }
}
</script>
