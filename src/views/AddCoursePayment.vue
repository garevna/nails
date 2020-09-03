<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6" class="d-md-flex justify-md-end">
        <v-btn
          ref="btn"
          rounded
          color="buttons"
          large
          dark
          min-width="160"
          class="yellow-button button-unactive"
          @click="toggleBtn"
        >CONFIRM DETAILS</v-btn>
      </v-col>
      <v-col cols="12" md="6">
        <v-btn color="buttons" rounded large dark min-width="160" class="yellow-button">EDIT DETAILS</v-btn>
      </v-col>
      <v-col cols="12" md="6">
        <v-card flat dark>
          <v-card-title>Requirements to the video</v-card-title>
          <v-card-text >Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, doloremque. Vel, aliquid illo, adipisci magnam ratione explicabo voluptates, aperiam voluptate inventore ea aspernatur veniam fugit animi et nihil obcaecati quibusdam!</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" offset-md="1" md="5" >
        <p>Upload video for moderation</p>
        <input type="file" style="display:none" @change="onSelectedFile" ref="fileInput"/>
        <v-btn color="buttons" rounded large dark min-width="160" class="yellow-button" :disabled="buttonUnactive" @click="$refs.fileInput.click()">UPLOAD VIDEO</v-btn>
      </v-col>
      <v-col cols="12" offset-md="3" md="6" class="pa-0 my-8" >
        <v-card flat>
          <v-card-title>Payment terms</v-card-title>
          <v-card-text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore excepturi veritatis itaque dolorem nam dolor quasi quibusdam, odio magni illo vero qui consequuntur deserunt vel consequatur beatae reiciendis odit atque.</v-card-text>
        </v-card>
      </v-col>
      <PaymentDetailsForm/>
    </v-row>
  </v-container>
</template>
<style scoped>
  .button-unactive {
    background-color:rgba(255, 255, 255, 0.12) !important;
    color: rgba(255, 255, 255, 0.3) !important;
  }
</style>
<script>
import PaymentDetailsForm from '@/components/forms/PaymentDetailsForm.vue'
export default {
  name: 'add-course-payment',
  components: {
    PaymentDetailsForm
  },
  data () {
    return {
      buttonUnactive: true,
      selectedFile: null
    }
  },
  watch: {
    buttonUnactive () {
      return this.buttonUnactive
    }
  },
  methods: {
    onSelectedFile ({ target }) {
      this.selectedFile = target.files[0]
    },
    toggleBtn () {
      const btn = this.$refs.btn.$el.classList
      this.buttonUnactive = !this.buttonUnactive
      return btn.contains('button-unactive') ? btn.remove('button-unactive') : btn.add('button-unactive')
    }
  }
}
</script>
