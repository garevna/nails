<template>
  <div>
    <div class="d-flex justify-center my-8">
      <table>
        <tr v-for="item in accessDays" :key="item._id">
          <td>{{ item.date }}</td>
          <td>available spots {{ item.availableSpots }}</td>
          <td>
            <v-btn text :disabled="!item.availableSpots" :class="{ buttons: id === item._id }" @click="id = item._id"
              >Select date</v-btn
            >
          </td>
        </tr>
      </table>
    </div>
    <PaymentForm @submit="sendData" :schema="schema" />
  </div>
</template>
<style scoped>
td {
  padding: 10px;
}
</style>
<script>
import { mapState, mapActions, mapMutations } from 'vuex';

import PaymentForm from '@/components/forms/PaymentForm.vue';
const schema = require('@/config/paymentSchema').default;
export default {
  components: {
    PaymentForm,
  },
  data() {
    return {
      schema,
      id: null,
    };
  },
  computed: {
    ...mapState(['error']),
    ...mapState('offlineCourses', ['offlineCourse']),
    accessDays() {
      return this.offlineCourse?.dateOfCourses ?? [];
    },
  },
  methods: {
    ...mapActions('offlineCourses', {
      getCourse: 'GET_COURSE',
      buyCourse: 'BUY_COURSE',
    }),
    ...mapMutations({
      message: 'MESSAGE'
    }),
    async sendData(data) {
      if (!this.id) {
        this.message({
          message: true,
          messageType: 'Buy offline course',
          messageText: 'Please, select date !!!',
        });
        return;
      }
      const res = Object.assign({}, data, {
        productId: this.$route.params.courseid,
        dateOfCourse: this.id,
      });
      delete res.message;
      await this.buyCourse(res);
      if (!this.error)  this.$router.back();
    },
  },
  created() {
    this.getCourse(this.$route.params.courseid);
  },
};
</script>
