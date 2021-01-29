<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" xs="10" offset-md="0" md="6" order="2" order-md="1">
        <h3 class="d-flex justify-center justify-md-start pb-16 pl-md-16">My account</h3>

        <v-card flat class="">
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

                    <!-- <v-btn v-if="disabled[name]" text @click="() => (disabled[name] = false)"> edit </v-btn> -->

                    <span class="edit-btn" v-if="disabled[name]" @click="() => (disabled[name] = false)">edit</span>
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-form>

          <v-card-actions v-if="touched" class="justify-center">
            <v-btn @click="cancel" color="buttons" rounded :disabled="sending" class="yellow-button mr-8">cancel</v-btn>

            <v-btn @click="confirm" color="buttons" rounded :disabled="sending" class="yellow-button">confirm</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" xs="12" md="6" order="1" order-md="2" class="d-flex flex-column align-md-end">
        <RightPanel />
      </v-col>
    </v-row>

    <BotomPanel />
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
const schema = require('@/config/profileSchema').default;

import RightPanel from '@/components/cabinet/RightPanel.vue';
import BotomPanel from '@/components/cabinet/BotomPanel.vue';

import EmailInput from '@/components/inputs/EmailInput.vue';
import PhoneInput from '@/components/inputs/PhoneInput.vue';
import TextInput from '@/components/inputs/TextInput.vue';

export default {
  name: 'UserCabinet',
  components: {
    RightPanel,
    BotomPanel,
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
      if (!this.$refs['profile-form'].validate()) return
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

<style scoped>
.edit {
  position: relative;
}
.edit-btn {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  color: rgb(39, 142, 211);
  cursor: pointer;
}
</style>
