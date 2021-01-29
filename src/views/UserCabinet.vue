<template>
  <v-container>
    <v-row>
      <v-col cols="12" xs="12" md="8" lg="6" xl="4" order="2" order-md="1">
        <h2 class="d-flex justify-center justify-md-start pb-16 pl-md-16">My account</h2>

        <v-card flat style="padding-bottom: 90px;">
          <v-form ref="profile-form">
            <v-simple-table>
              <tbody>
                <tr v-for="(field, name) in schema" :key="name">
                  <td>{{ field.label }}</td>
                  <td class="d-flex edit">
                    <EmailInput
                      v-if="field.type === 'email'"
                      :value.sync="data[name]"
                      :required="field.required"
                      :disabled.sync="disabled[name]"
                      :outlined="false"
                    />
                    <PhoneInput
                      v-if="field.type === 'phone'"
                      :value.sync="data[name]"
                      :required="field.required"
                      :disabled.sync="disabled[name]"
                      :outlined="false"
                    />
                    <TextInput
                      v-if="field.type === 'text'"
                      :value.sync="data[name]"
                      :required="field.required"
                      :disabled.sync="disabled[name]"
                      :outlined="false"
                    />

                    <span class="edit-btn btnEdit--text" v-if="disabled[name]" @click="() => (disabled[name] = false)"
                      >edit</span
                    >
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-form>

          <v-card-actions v-if="touched" class="justify-center btn-edit-cansel">
            <v-btn @click="cancel" color="buttons" rounded :disabled="sending" class="yellow-button mr-8">cancel</v-btn>

            <v-btn @click="confirm" color="buttons" rounded :disabled="sending" class="yellow-button">confirm</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" xs="12" md="4" lg="6" xl="8" order="1" order-md="2">
        <RightPanel />
      </v-col>
    </v-row>
    <BottomPanel />
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
const schema = require('@/config/profileSchema').default;

import RightPanel from '@/components/cabinet/RightPanel.vue';
import BottomPanel from '@/components/cabinet/BottomPanel.vue';

import EmailInput from '@/components/inputs/EmailInput.vue';
import PhoneInput from '@/components/inputs/PhoneInput.vue';
import TextInput from '@/components/inputs/TextInput.vue';

export default {
  name: 'UserCabinet',
  components: {
    RightPanel,
    BottomPanel,
    EmailInput,
    PhoneInput,
    TextInput,
  },
  data() {
    return {
      schema,
      data: Object.keys(schema).reduce((acc, key) => Object.assign(acc, { [key]: '' }), {}),
      disabled: Object.keys(schema).reduce((acc, key) => Object.assign(acc, { [key]: true }), {}),
      sending: false,
    };
  },
  computed: {
    ...mapState('auth', ['user']),
    touched() {
      return Object.values(this.disabled).some(val => !val);
    },
  },
  watch: {
    user(val) {
      if (!val) return;
      this.sending = false;
      this.resetDisabled();
      this.fillProfile();
    },
  },
  methods: {
    cancel() {
      this.fillProfile();
      this.resetDisabled();
    },
    confirm() {
      if (!this.$refs['profile-form'].validate()) return;
      this.data.isPoliticAgree = true;
      this.sending = true;
      this.$store.dispatch('auth/EDIT_USER', this.data);
    },
    fillProfile() {
      if (this.user) {
        Object.keys(this.schema).forEach(key => {
          this.data[key] = this.user[key];
        });
      }
    },
    resetDisabled() {
      Object.keys(this.disabled).forEach(key => (this.disabled[key] = true));
    },
    goTo(name) {
      if (this.$route.name !== name) this.$router.push({ name: name });
    },
  },
  beforeMount() {
    this.fillProfile();
  },
};
</script>
<style>
.edit .v-text-field > .v-input__control > .v-input__slot:before {
  border-style: none !important;
}
</style>
<style scoped>
.btn-edit-cansel {
  position: absolute;
  bottom:0;
  left: 50%;
  transform: translateX(-50%);
}
table tr td {
  font-size: 20px !important;
}
table tr td:first-child {
  width: 40%;
}
.edit {
  position: relative;
}
.edit-btn {
  position: absolute;
  right: 0;
  bottom: 0;
  cursor: pointer;
}
</style>
