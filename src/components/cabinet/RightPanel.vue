<template>
  <div class="d-flex flex-column align-lg-end cabinet-btn">
    <v-btn text @click="dialog = true" class="mb-4 font-size-btn-text">Log out</v-btn>
    <v-btn text @click="goTo('user-courses')" class="font-size-btn-text"> My courses</v-btn>
    <v-btn text @click="goTo('products-cart')" class="font-size-btn-text">Shoping cart</v-btn>

    <v-btn text v-if="!isAdmin" @click="goTo('purchased-commodities')" class="font-size-btn-text">
      purchased commodities
    </v-btn>
    <v-btn text v-if="!isAdmin" @click="goTo('purchased-online-courses')" class="font-size-btn-text">
      purchased online courses
    </v-btn>
    <v-btn text v-if="!isAdmin" @click="goTo('purchased-offline-courses')" class="font-size-btn-text">
      purchased offline courses
    </v-btn>

    <v-btn text @click="goTo('change-password')" class="font-size-btn-text">change password</v-btn>
    <v-btn text v-if="isAdmin" @click="goToAdmin" class="mt-4 font-size-btn-text">go to admin panel</v-btn>

    <v-dialog v-model="dialog" persistent max-width="350">
      <v-card>
        <v-card-title class="justify-center"> Do you really want to leave ?</v-card-title>
        <v-card-actions class="d-flex flex-column justify-center">
          <v-btn color="buttons" rounded large text @click="logoutUser(false)"> Log out from current device </v-btn>
          <v-btn color="buttons" rounded large text @click="logoutUser(true)"> Log out from all devices  </v-btn>
          <v-btn color="buttons" rounded large text @click="dialog = false"> Cancel </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'RightPanel',
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    ...mapState('auth', ['user']),
    isAdmin() {
      return this.user.roles.includes('Admin');
    },
  },
  watch: {},
  methods: {
    goToAdmin() {
      window.location = `${process.env.VUE_APP_HOST_URL}/admin`;
    },
    logoutUser(all) {
      this.$store.dispatch('auth/LOG_OUT', all);
      this.$router.push({ name: 'home' });
      this.dialog = false;
    },
    goTo(name) {
      if (this.$route.name !== name) this.$router.push({ name: name });
    },
  },
};
</script>

<style scoped>
.font-size-btn-text {
  font-size: 18px;
}
</style>