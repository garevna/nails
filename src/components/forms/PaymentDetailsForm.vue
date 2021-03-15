<template>
  <v-form ref="form">
    <div v-for="(field, name) in schema" :key="name">
      <TextInput
        v-if="field.type === 'text'"
        :value.sync="data[name]"
        :label="field.label"
        :required="field.required"
      />
      <EmailInput
        v-if="field.type === 'email'"
        :value.sync="data[name]"
        :label="field.label"
        :required="field.required"
      />
      <PhoneInput
        v-if="field.type === 'phone'"
        :value.sync="data[name]"
        :label="field.label"
        :required="field.required"
      />
    </div>
    <TextInput
      v-if="!pickup"
      :value.sync="data.deliveryAddress"
      label="Delivery address"
      :required="true"
      :limit="100"
    />
    <PrevNextBtns @prev="$emit('prev')" @next="next" />
  </v-form>
</template>
<script>
import { mapState } from 'vuex';

import EmailInput from '@/components/inputs/EmailInput.vue';
import TextInput from '@/components/inputs/TextInput.vue';
import PhoneInput from '@/components/inputs/PhoneInput.vue';

import PrevNextBtns from '@/components/forms/PrevNextBtns.vue';

const schema = require('@/config/commoditySchemaPayment').default;

export default {
  name: 'PaymentDetailsForm',
  props: {
    pickup: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    EmailInput,
    TextInput,
    PhoneInput,
    PrevNextBtns,
  },
  data() {
    return {
      schema,
      data: Object.keys(schema).reduce(
        (acc, key) =>
          Object.assign(acc, {
            [key]: '',
          }),
        {
          deliveryAddress: '',
        }
      ),
    };
  },

  computed: {
    ...mapState('auth', ['user']),
  },
  methods: {
    next() {
      if (this.$refs.form.validate()) {
        this.$emit('next', this.data);
      }
    },
    fillingFields() {
      if (!this.user) return;
      Object.keys(this.data).forEach(key => (this.data[key] = this.user[key] ?? ''));
    },
  },
  mounted() {
    setTimeout(this.fillingFields, 1000);
  },
};
</script>
