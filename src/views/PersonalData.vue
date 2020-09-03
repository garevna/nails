<template>
  <FormForCourse/>
</template>
<script>
import FormForCourse from '@/components/forms/FormForCourse.vue'
export default {
  name: 'personal-data',
  components: {
    FormForCourse
  },
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
