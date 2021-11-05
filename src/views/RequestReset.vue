<template>
  <v-form ref="form" class="form mt-16">
    <div class="d-flex flex-column align-center">
      <h2>Please, input your email</h2>
      <div class="input-container pa-4">
        <EmailInput :value.sync="email" label="Email" :required="true" :outlined="false" />
      </div>
      <div class="d-flex">
        <v-btn @click="submit" color="buttons" rounded :disabled="loading" class="yellow-button">submit</v-btn>
      </div>
    </div>
  </v-form>
</template>

<script>
import EmailInput from '@/components/inputs/EmailInput.vue';
import { mapState } from 'vuex';

export default {
  name: 'RequestReset',
  components: {
    EmailInput,
  },
  data() {
    return {
      email: '',
    };
  },
  computed: {
    ...mapState('auth', ['loading']),
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('auth/REQUEST_RESET', this.email);
      }
    },
  },
};
</script>

<style scoped>
.input-container {
  min-width: 350px;
}
</style>>