<template>
  <div class="text-center">
    <h4 v-if="error" class="error--text">{{error}}</h4>
    <table>
      <tr v-for="item in accessDays" :key="item._id">
        <td>{{ item.date }}</td>
        <td>available spots {{ item.availableSpots }}</td>
        <td>
          <v-btn
            text
            :disabled="!item.availableSpots"
            :class="{'buttons': id === item._id}"
            @click="id = item._id; error = ''"
            >Select date</v-btn
          >
        </td>
      </tr>
    </table>
    <PaymentForm @submit="sendData" :schema="schema" />
  </div>
</template>
<style scoped>
td {
  padding: 10px;
}
</style>
<script>
import { mapState, mapActions } from 'vuex'

import PaymentForm from '@/components/forms/PaymentForm.vue'
const schema = require('@/config/paymentSchema').default
export default {
  components: {
    PaymentForm
  },
  data () {
    return {
      schema,
      id: null,
      error: ''
    }
  },
  computed: {
    ...mapState('offlineCourses', ['offlineCourse']),
    accessDays () {
      return this.offlineCourse?.dateOfCourses ?? []
    }
  },
  methods: {
    ...mapActions('offlineCourses', {
      getCourse: 'GET_COURSE',
      buyCourse: 'BUY_COURSE'
    }),
    async sendData (data) {
      if (!this.id) {
        this.error = 'Please select date !!!'
        return
      }
      const res = Object.assign({}, data, {
        productId: this.$route.params.courseid,
        dateOfCourse: this.id
      })
      delete res.message
      this.buyCourse(res)
      // ['fullName', 'email', 'phone', 'message', 'checkbox'].forEach((item) => { this[item] = '' })
    }
  },
  created () {
    this.getCourse(this.$route.params.courseid)
  }
}
</script>
