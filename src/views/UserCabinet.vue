<template>
  <v-card flat class="homefone d-flex justify-space-between">
    <v-card flat>
      <h3>My account</h3>
      <div class="d-flex align-baseline">
        <span width="100px" class="mr-4">User name</span>
        <v-text-field />
      </div>
      <div class="d-flex align-baseline">
        <span class="mr-4">Full name</span>
        <v-text-field />
      </div>
      <div class="d-flex align-baseline">
        <span class="mr-4">Email</span>
        <v-text-field />
      </div>
      <div class="d-flex align-baseline">
        <span class="mr-4">Phone number</span>
        <v-text-field />
      </div>
    </v-card>
    <div class="d-flex flex-column">
      <v-btn @click="dialog = true">Log out</v-btn>
      <v-btn> My courses</v-btn>
      <v-btn>Shoping card</v-btn>
    </div>
    <v-dialog v-model="dialog" persistent max-width="320">
      <v-card>
        <v-card-title> Do you really want to leave ?</v-card-title>
        <v-card-actions class="justify-center">
          <v-btn
            color="buttons"
            rounded
            large
            class="yellow-button"
            text
            @click="dialog = false"
          >
            Disagree
          </v-btn>
          <v-btn
            color="buttons"
            rounded
            large
            class="yellow-button"
            text
            @click="logoutUser"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'UserCabinet',
  data () {
    return {
      dialog: false
    }
  },
  computed: {
    ...mapState('auth', ['user'])
  },
  methods: {
    logoutUser () {
      this.$store.dispatch('auth/LOGOUT')
      this.dialog = false
    }
  }
}
</script>

<style>
</style>
