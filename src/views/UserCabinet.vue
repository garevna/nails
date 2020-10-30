<template>
  <div>
    <v-card flat class="homefone d-block d-md-flex justify-space-between">
      <v-card flat min-width="550px" class="pl-16 pb-16">
        <h3>My account</h3>
        <v-card flat class="d-flex align-baseline align-end">
          <v-card flat min-width="140px" class="mr-4">
            <v-card-text class="pa-0 text-end">User name</v-card-text>
          </v-card>
          <v-card flat width="100%">
            <v-text-field v-model="userName" disabled/>
          </v-card>
        </v-card>
        <!--  -->
        <v-card flat class="d-flex align-baseline">
          <v-card flat min-width="140px" class="mr-4">
            <v-card-text class="pa-0 text-end">Full name</v-card-text>
          </v-card>
          <v-card flat width="100%" class="edit-container">
            <v-text-field v-model="fullName" :disabled="fullNameDisabled"/>
            <span class="edit-btn" v-if="fullNameDisabled" @click="editHandler('fullNameDisabled')">edit</span>
          </v-card>
        </v-card>
        <!--  -->
        <v-card flat class="d-flex align-baseline">
          <v-card flat min-width="140px" class="mr-4">
            <v-card-text class="pa-0 text-end">Email</v-card-text>
          </v-card>
          <v-card flat width="100%" class="edit-container">
            <v-text-field  v-model="email" :disabled="emailDisabled"/>
            <span class="edit-btn" v-if="emailDisabled" @click="editHandler('emailDisabled')">edit</span>
          </v-card>
        </v-card>
        <!--  -->
        <v-card flat class="d-flex align-baseline">
          <v-card flat min-width="140px" class="mr-4">
            <v-card-text class="pa-0 text-end">Phone number</v-card-text>
          </v-card>
          <v-card flat width="100%" class="edit-container">
            <v-text-field v-model="phone" :disabled="phoneDisabled"/>
            <span class="edit-btn"  v-if="phoneDisabled" @click="editHandler('phoneDisabled')">edit</span>
          </v-card>
        </v-card>
        <!--  -->
        <v-card flat class="d-flex align-baseline mt-16">
          <v-card flat min-width="140px" class="mr-4">
            <v-card-text class="pa-0 text-end">Delivery address</v-card-text>
          </v-card>
          <v-card flat width="100%" class="edit-container">
            <v-text-field v-model="deliveryAddress" :disabled="deliveryAddressDisabled"/>
            <span class="edit-btn"  v-if="deliveryAddressDisabled" @click="editHandler('deliveryAddressDisabled')">edit</span>
          </v-card>
        </v-card>
        <!--  -->
        <v-card flat>
          <v-btn  v-if="touched" @click="cancel" color="buttons" rounded class="yellow-button">cancel</v-btn>
          <v-btn v-if="touched" @click="confirm" color="buttons" rounded class="yellow-button">confirm</v-btn>
        </v-card>
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
    <div class="d-flex justify-center">
      <v-btn color="buttons" rounded class="yellow-button mr-16"
        >All courses</v-btn
      >
      <v-btn color="buttons" rounded class="yellow-button mx-16">Shop</v-btn>
      <v-btn color="buttons" rounded class="yellow-button ml-16"
        >Add course</v-btn
      >
    </div>
  </div>
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
      return !(this.fullNameDisabled && this.emailDisabled && this.phoneDisabled && this.deliveryAddressDisabled)
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
  right: -15%;
  top: 50%;
  transform: translateY(-50%);
  color:rgb(39, 142, 211);
  cursor: pointer;
}
</style>
