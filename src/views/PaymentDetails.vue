<template>
  <v-form ref="form">
    <v-container>
      <!-- <v-row justify="center" align="center" align-content="center" class="flex-column"> -->
      <v-row>
        <v-col cols="12" xs="12"  offset-sm="2" sm="8" offset-md="3" md="6">
          <v-text-field
            v-model="cardHolderName"
            :rules="[rules.required]"
            label="Card holder name"
            outlined
            dark
          ></v-text-field>
        </v-col>
        <v-col cols="12" xs="12"  offset-sm="2" sm="8" offset-md="3" md="6">
          <v-text-field
            v-model="cardNumber"
            :rules="[rules.required]"
            label="Card number"
            outlined
            dark
          ></v-text-field>
        </v-col>
        <v-col cols="12" xs="12"  offset-sm="2" sm="4" offset-md="3" md="3">
          <v-text-field
            class="field"
            v-model="expDate"
            :rules="[rules.required]"
            label="Exp date"
            outlined
            dark
          ></v-text-field>
        </v-col>
        <v-col cols="12" xs="12" sm="4" md="3">
          <v-text-field
            class="field"
            v-model="cvc"
            :rules="[rules.required]"
            label="CVC"
            outlined
            dark
          ></v-text-field>
        </v-col>
        <v-col cols="12" xs="12"  offset-sm="2" sm="8" offset-md="3" md="6">
          <v-text-field v-model="amount" :rules="[rules.required]" label="Amount" outlined dark></v-text-field>
        </v-col>
        <v-col cols="12" xs="12" offset-sm="2" sm="4" offset-md="3" md="3">
          <v-checkbox
            v-model="checkbox"
            :rules="[rules.required]"
            label="Agree to privacy policy"
            dark
          ></v-checkbox>
        </v-col>
        <v-col cols="12" xs="12" sm="4" md="3" class="d-flex justify-sm-end ">
          <v-checkbox v-model="checkbox2" :rules="[rules.required]" label="Lorem ipsum" dark></v-checkbox>
        </v-col>
        <v-col cols="12" style="text-align:center">
          <v-btn
            color="buttons"
            rounded
            outlined
            small
            dark
            min-width="90"
            class="yellow-button"
            @click="checkForm"
          >PAY</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
<style scoped>
/* .v-text-field {
  min-width: 300px;
}
.field {
  min-width:100px;
} */
</style>
<script>
export default {
  name: 'personal-data',
  data () {
    return {
      cardHolderName: '',
      cardNumber: '',
      expDate: '',
      cvc: '',
      amount: '',
      checkbox: '',
      checkbox2: '',
      rules: {
        required: (v) => !!v || 'input is required',
        minLengthName: (v) => v.length <= 15 || 'the maximum number of characters entered'
      }
    }
  },

  methods: {
    sendData () {
      this.$store.dispatch('', {
        cardHolderName: this.cardHolderName,
        cardNumber: this.cardNumber,
        expDate: this.expDate,
        cvc: this.cvc,
        amount: this.amount,
        checkbox: this.checkbox,
        checkbox2: this.checkbox2
      });

      ['cardHolderName', 'cardNumber', 'expDate', 'cvc', 'amount', 'checkbox', 'checkbox2'].forEach((item) => { this[item] = '' })
    },
    checkForm () {
      if (this.$refs.form.validate()) {
        this.sendData()
        // this.$router.push('/')
      }
    }
  }
}
</script>
