<template>
  <v-form ref="form" :disabled="loading">
    <v-container>
      <v-row>
        <v-col cols="12" offset-sm="2" sm="8" offset-md="3" md="6">
          <div v-for="(field, name) in schema" :key="name">
            <EmailInput
              v-if="field.type === 'email'"
              :value.sync="data[name]"
              :label="field.label"
              :required="field.required"
            />
            <TextInput
              v-if="field.type === 'text'"
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
            <TextAreaInput
              v-if="field.type === 'textarea'"
              :value.sync="data[name]"
              :label="field.label"
              :required="field.required"
            />
          </div>
        </v-col>
        <v-col cols="12" offset-sm="2" sm="8" offset-md="3" md="6">
          <v-checkbox v-model="checkbox" :rules="[rules.required]" label="Agree to privacy policy" dark></v-checkbox>
        </v-col>
        <v-col cols="12" style="text-align: center">
          <v-btn color="buttons" :disabled="loading" rounded outlined small dark min-width="90" class="yellow-button mt-4" @click="submit"
            >submit</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { mapState } from 'vuex';

import TextInput from '@/components/inputs/TextInput.vue';
import EmailInput from '@/components/inputs/EmailInput.vue';
import PhoneInput from '@/components/inputs/PhoneInput.vue';
import TextAreaInput from '@/components/inputs/TextAreaInput.vue';

export default {
  props: {
    schema: {
      type: Object,
      required: true,
    },
    loading:{
      type: Boolean,
      default: false
    }
  },
  name: 'PaymentForm',
  components: {
    EmailInput,
    TextInput,
    PhoneInput,
    TextAreaInput,
  },
  data() {
    return {
      data: Object.keys(this.schema).reduce((acc, key) => {
        return Object.assign(acc, { [key]: '' });
      }, {}),
      checkbox: '',
      rules: {
        required: v => !!v || 'input is required',
      },
    };
  },
  computed: {
    ...mapState('auth', ['user']),
  },
  methods: {
    fillingForm() {
      if (!this.user) return;
      this.data.email = this.user.email;
      this.data.phone = this.user.phone;
      this.data.firstName = this.user.firstName;
      this.data.lastName = this.user.lastName;
    },
    submit() {
      if (this.$refs.form.validate()) {
        this.data.userId = this.user ? this.user._id : '';
        this.data.productId = this.$route.params.courseid;
        this.$emit('submit', this.data);
      }
    },
  },
  mounted() {
    this.fillingForm()
  },
};
</script>
