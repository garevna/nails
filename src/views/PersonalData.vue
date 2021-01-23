<template>
  <PaymentForm @submit="sendData" :schema="schema"/>
</template>
<script>
import { mapActions } from 'vuex'

import PaymentForm from '@/components/forms/PaymentForm.vue'
const schema = require('@/config/paymentSchema').default

export default {
  components: {
    PaymentForm
  },
  data () {
    return {
      schema
    }
  },

  methods: {
    ...mapActions('courses', {
      buyCourse: 'BUY_COURSE',
      getCourse: 'GET_COURSE'
    }),
    async sendData (data) {
      const res = Object.assign({}, data, {
        productId: this.$route.params.courseid
      })
      delete res.message
      console.log(res)
      this.buyCourse(res)
      // ['fullName', 'email', 'phone', 'message', 'checkbox'].forEach((item) => { this[item] = '' })
    }
  },
  created () {
    this.getCourse(this.$route.params.courseid)
  }
}
</script>
