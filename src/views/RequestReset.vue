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

export default {
  name: 'RequestReset',
  components: {
    EmailInput,
  },
  data() {
    return {
      loading: false,
      email: '',
    };
  },
  computed: {},
  watch: {},
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const isComplete = await this.$store.dispatch('auth/REQUEST_RESET', this.email);
        this.loading = false;
        if (isComplete) this.$router.push({ name: 'home' });
      }
    },
  },
  mounted() {},
  beforeDestroy() {},
};
</script>

<style scoped>
.input-container {
  min-width: 350px;
}
</style>>