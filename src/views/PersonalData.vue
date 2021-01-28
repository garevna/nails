<template>
  <PaymentForm @submit="sendData" :schema="schema" />
</template>
<script>
import { mapState, mapActions } from 'vuex';

import PaymentForm from '@/components/forms/PaymentForm.vue';
const schema = require('@/config/paymentSchema').default;

export default {
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
  },
  methods: {
    ...mapActions('courses', {
      buyCourse: 'BUY_COURSE',
      getCourse: 'GET_COURSE',
    }),
    async sendData(data) {
      const res = Object.assign({}, data, {
        productId: this.$route.params.courseid,
      });
      delete res.message;
      console.log(res);
      await this.buyCourse(res);
      if (!this.error) this.$router.back();
    },
  },
  created() {
    this.getCourse(this.$route.params.courseid);
  },
};
</script>
