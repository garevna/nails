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
    <InputWithAutocomplete
      v-if="!pickup"
      :country="country"
      :value.sync="data.deliveryAddress"
      label="Delivery address"
      :required="true"
      :limit="100"
      @autocomplete="changeFlag"
    />
    <PrevNextBtns @prev="$emit('prev')" @next="next" />
  </v-form>
</template>
<script>
import { mapState, mapMutations } from 'vuex';

import EmailInput from '@/components/inputs/EmailInput.vue';
import TextInput from '@/components/inputs/TextInput.vue';
import PhoneInput from '@/components/inputs/PhoneInput.vue';
import InputWithAutocomplete from '@/components/inputs/InputWithAutocomplete.vue';

import PrevNextBtns from '@/components/forms/PrevNextBtns.vue';

const schema = require('@/config/commoditySchemaPayment').default;

export default {
  name: 'PaymentDetailsForm',
  props: {
    pickup: {
      type: Boolean,
      default: false,
    },

    country: {
      type: String,
      default: 'au',
    },
  },
  components: {
    EmailInput,
    TextInput,
    PhoneInput,
    PrevNextBtns,
    InputWithAutocomplete,
  },
  data() {
    return {
      schema,
      isAutocomplete: false,
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
    ...mapMutations({
      message: 'MESSAGE',
    }),
    next() {
      if (!this.$refs.form.validate()) return;
      if (!this.isAutocomplete) {
        this.message({
          message: true,
          messageType: 'Delivery address',
          messageText: 'please select an address from the list suggested by autocomplete !!!',
        });
        return;
      }
      this.$emit('next', this.data);
    },
    changeFlag(flag) {
      this.isAutocomplete = flag;
    },
    fillingFields() {
      if (!this.user) return;
      Object.keys(this.data).forEach(key => (this.data[key] = this.user[key] ?? ''));
      setTimeout(() => (this.isAutocomplete = true), 200);
    },
  },
  mounted() {
    setTimeout(this.fillingFields, 500);
  },
};
</script>
