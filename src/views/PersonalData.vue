<template>
  <PaymentForm @submit="sendData" :schema="schema" :loading="loading" />
</template>
<script>
import { mapState, mapActions } from 'vuex';

import PaymentForm from '@/components/forms/PaymentForm.vue';
const schema = require('@/config/paymentSchema').default;

export default {
  name: 'PersonalData',
  components: {
    PaymentForm,
  },
  data() {
    return {
      schema,
    };
  },
  computed: {
    ...mapState(['error']),
    ...mapState('auth', ['user']),
    ...mapState('courses', ['loading']),
  },
  methods: {
    ...mapActions('courses', {
      buyCourse: 'BUY_COURSE',
      getCourse: 'GET_COURSE',
      buyEndCustomer: 'BUY_END_CUSTOMER',
    }),
    async sendData(data) {
      // this.$route.name === 'by-course' ? await this.buyCourse(data) : await this.buyEndCustomer(data);
      // if (!this.error) this.$router.back();
      if (this.$route.name === 'by-course-creator') {
        await this.buyCourse(data);
        if (!this.error) this.$router.push({ name: 'user-courses' });
      } else {
        await this.buyEndCustomer(data);
        if (!this.error) this.$router.push({ name: 'courses-online' });
      }
    },
  },
  created() {
    this.getCourse(this.$route.params.courseid);
  },
};
</script>
