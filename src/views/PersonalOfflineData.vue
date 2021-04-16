<template>
  <div>
    <div class="d-flex justify-center my-8">
      <table>
        <tr>
          <th>Date of course</th>
          <th>Available spots</th>
        </tr>
        <tr v-for="item in dateOfCourses" :key="item.id">
          <td>{{ item.date }}</td>
          <td class="text-right">{{ item.availableSpots }}</td>
          <td>
            <v-btn text :disabled="!item.availableSpots" :class="{ buttons: id === item.id }" @click="id = item.id"
              >Select date</v-btn
            >
          </td>
        </tr>
      </table>
    </div>
    <PaymentForm @submit="sendData" :schema="schema" :loading="loading" />
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
import { datesToString } from '@/helpers/datesToString';
const schema = require('@/config/paymentSchema').default;
export default {
  name: 'PersonalOfflineData',
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
    ...mapState('offlineCourses', ['offlineCourse', 'loading']),
    accessDays() {
      return this.offlineCourse?.dateOfCourses ?? [];
    },
    dateOfCourses() {
      return this.accessDays.map(item => ({
        date: this.formatedDate(item.date),
        availableSpots: item.availableSpots,
        id: item._id,
      }));
    },
  },
  methods: {
    ...mapActions('offlineCourses', {
      getCourse: 'GET_COURSE',
      buyCourse: 'BUY_COURSE',
    }),
    ...mapMutations({
      message: 'MESSAGE',
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
      if (!this.error) this.$router.back();
    },
    formatedDate(date) {
      let dates = [];
      try {
        dates = JSON.parse(date);
      } catch (e) {
        // console.error(e.message);
      }
      if (!Array.isArray(dates)) dates = [];
      return datesToString(dates);
    },
  },
  created() {
    this.getCourse(this.$route.params.courseid);
  },
};
</script>
