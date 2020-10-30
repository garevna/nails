<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" xs="10" offset-md="0" md="6" order="2" order-md="1">
        <h3 class="d-flex justify-center justify-md-start pb-16 pl-md-16">My account</h3>
        <v-card flat class="d-sm-flex align-baseline">
          <v-card flat min-width="140px" class="mr-4">
            <v-card-text class="pa-0 text-center text-sm-end"
              >User name</v-card-text
            >
          </v-card>
          <v-card flat width="100%">
            <v-text-field v-model="userName" disabled />
          </v-card>
        </v-card>
        <!--  -->
        <v-card flat class="d-sm-flex align-baseline">
          <v-card flat min-width="140px" class="mr-4">
            <v-card-text class="pa-0 text-center text-sm-end"
              >Full name</v-card-text
            >
          </v-card>
          <v-card flat width="100%" class="edit-container">
            <v-text-field
              v-model="fullName"
              :disabled="fullNameDisabled"
              class="pr-8"
            />
            <span
              class="edit-btn"
              v-if="fullNameDisabled"
              @click="editHandler('fullNameDisabled')"
              >edit</span
            >
          </v-card>
        </v-card>
        <!--  -->
        <v-card flat class="d-sm-flex align-baseline">
          <v-card flat min-width="140px" class="mr-4">
            <v-card-text class="pa-0 text-center text-sm-end"
              >Email</v-card-text
            >
          </v-card>
          <v-card flat width="100%" class="edit-container">
            <v-text-field
              v-model="email"
              :disabled="emailDisabled"
              class="pr-8"
            />
            <span
              class="edit-btn"
              v-if="emailDisabled"
              @click="editHandler('emailDisabled')"
              >edit</span
            >
          </v-card>
        </v-card>
        <!--  -->
        <v-card flat class="d-sm-flex align-baseline">
          <v-card flat min-width="140px" class="mr-4">
            <v-card-text class="pa-0 text-center text-sm-end"
              >Phone number</v-card-text
            >
          </v-card>
          <v-card flat width="100%" class="edit-container">
            <v-text-field
              v-model="phone"
              :disabled="phoneDisabled"
              class="pr-8"
            />
            <span
              class="edit-btn"
              v-if="phoneDisabled"
              @click="editHandler('phoneDisabled')"
              >edit</span
            >
          </v-card>
        </v-card>
        <!--  -->
        <v-card flat class="d-sm-flex align-baseline mt-16">
          <v-card flat min-width="140px" class="mr-4">
            <v-card-text class="pa-0 text-center text-sm-end"
              >Delivery address</v-card-text
            >
          </v-card>
          <v-card flat width="100%" class="edit-container">
            <v-text-field
              v-model="deliveryAddress"
              :disabled="deliveryAddressDisabled"
              class="pr-8"
            />
            <span
              class="edit-btn"
              v-if="deliveryAddressDisabled"
              @click="editHandler('deliveryAddressDisabled')"
              >edit</span
            >
          </v-card>
        </v-card>
        <!--  -->
        <v-card flat>
          <v-btn
            v-if="touched"
            @click="cancel"
            color="buttons"
            rounded
            class="yellow-button"
            >cancel</v-btn
          >
          <v-btn
            v-if="touched"
            @click="confirm"
            color="buttons"
            rounded
            class="yellow-button"
            >confirm</v-btn
          >
        </v-card>
      </v-col>
      <v-col
        cols="12"
        xs="12"
        md="6"
        order="1"
        order-md="2"
        class="d-flex flex-column align-md-end"
      >
        <v-btn text @click="dialog = true">Log out</v-btn>
        <v-btn text> My courses</v-btn>
        <v-btn text>Shoping card</v-btn>
      </v-col>
    </v-row>
    <div class="d-flex flex-column flex-sm-row align-center justify-sm-space-around mt-16">
      <v-btn color="buttons" rounded class="yellow-button"
        >All courses</v-btn
      >
      <v-btn color="buttons" rounded class="yellow-button my-12 my-sm-0">Shop</v-btn>
      <v-btn color="buttons" rounded class="yellow-button"
        >Add course</v-btn
      >
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
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'UserCabinet',
  data () {
    return {
      dialog: false,
      userName: '',
      fullName: '',
      fullNameDisabled: true,
      email: '',
      emailDisabled: true,
      phone: '',
      phoneDisabled: true,
      deliveryAddress: '',
      deliveryAddressDisabled: true,
      role: 'User',
      isPoliticAgree: true
    }
  },
  computed: {
    ...mapState('auth', ['user']),
    touched () {
      return !(
        this.fullNameDisabled &&
        this.emailDisabled &&
        this.phoneDisabled &&
        this.deliveryAddressDisabled
      )
    }
  },
  watch: {
    user () {
      this.fillingInTheFields()
      this.resetDisabled()
    }
  },
  methods: {
    logoutUser () {
      this.$store.dispatch('auth/LOGOUT')
      this.dialog = false
    },
    editHandler (type) {
      this[type] = !this[type]
    },
    cancel () {
      this.fillingInTheFields()
      this.resetDisabled()
    },
    confirm () {
      const data = {
        firstName: this.fullName.split(' ')[0],
        lastName: this.fullName.split(' ')[1],
        email: this.email,
        phone: this.phone,
        deliveryAddress: this.deliveryAddress,
        role: this.role,
        isPoliticAgree: this.isPoliticAgree
      }
      this.$store.dispatch('auth/EDIT_USER', data)
    },

    fillingInTheFields () {
      this.userName = this.user.firstName
      this.fullName = `${this.user.firstName} ${this.user.lastName}`
      this.email = this.user.email
      this.phone = this.user.phone
      this.deliveryAddress = this.user.deliveryAddress
    },
    resetDisabled () {
      this.fullNameDisabled = true
      this.emailDisabled = true
      this.phoneDisabled = true
      this.deliveryAddressDisabled = true
    }
  },
  beforeMount () {
    this.fillingInTheFields()
  }
}
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
