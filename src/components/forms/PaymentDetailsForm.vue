<template>
  <v-form ref="form">
    <v-container>
      <v-row>
        <v-col cols="12" xs="12" offset-md="3" md="6" class="pa-0 my-8">
          <p>Payment details</p>
        </v-col>
        <v-col
          cols="12"
          xs="12"
          offset-sm="2"
          sm="8"
          offset-md="3"
          md="6"
          offset-xl="4"
          xl="8"
          class="pa-0"
        >
          <v-text-field
            v-model="cardHolderName"
            :rules="[rules.required]"
            label="Card holder name"
            outlined
            dark
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          xs="12"
          offset-sm="2"
          sm="8"
          offset-md="3"
          md="6"
          offset-xl="4"
          xl="8"
          class="pa-0"
        >
          <v-text-field
            :value="cardNumber"
            :rules="[rules.required,rules.lengthOfCardNumber]"
            label="Card number"
            outlined
            dark
            maxlength="19"
            @input="cardNumberValidation"
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          xs="12"
          offset-sm="2"
          sm="4"
          offset-md="3"
          md="3"
          offset-xl="4"
          xl="3"
          class="pa-0 d-flex"
        >
          <v-select :items="month" v-model="cardMonth" :rules="[rules.required]" class="pr-4" label="Month" dark outlined></v-select>
          <v-select :items="years" v-model="cardYear" :rules="[rules.required]" class="pl-4" label="Year" dark outlined></v-select>
        </v-col>
        <v-col
          cols="12"
          xs="12"
          offset-sm="1"
          sm="3"
          offset-md="1"
          md="2"
          offset-xl="2"
          xl="3"
          class="pa-0"
        >
          <v-text-field
            class="field"
            v-model="cvc"
            :rules="[rules.required, rules.onlyDigits,rules.cvcLength]"
            label="CVC"
            outlined
            maxlength="3"
            dark
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          xs="12"
          offset-sm="2"
          sm="8"
          offset-md="3"
          md="6"
          offset-xl="4"
          xl="8"
          class="pa-0"
        >
          <v-text-field v-model="amount" :rules="[rules.required]" label="Amount" outlined dark></v-text-field>
        </v-col>
        <v-col
          cols="12"
          xs="12"
          offset-sm="2"
          sm="10"
          offset-md="3"
          md="9"
          offset-xl="4"
          xl="8"
          class="pa-0"
        >
          <v-checkbox
            v-model="checkbox"
            :rules="[rules.required]"
            label="Agree to privacy policy"
            dark
          ></v-checkbox>
        </v-col>
        <v-col
          cols="12"
          xs="12"
          offset-sm="2"
          sm="10"
          offset-md="3"
          md="9"
          offset-xl="4"
          xl="8"
          class="pa-0"
        >
          <v-checkbox v-model="checkbox2" :rules="[rules.required]" label="Lorem ipsum" dark></v-checkbox>
        </v-col>
        <v-col cols="12" style="text-align:center" offset-xl="4" xl="8">
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
</style>
<script>
export default {
  name: 'personal-data',
  data () {
    return {
      cardHolderName: '',
      cardNumber: '',
      cardMonth: '',
      cardYear: '',
      cvc: '',
      amount: '',
      checkbox: '',
      checkbox2: '',
      month: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
      years: [],
      rules: {
        required: (v) => !!v || 'input is required',
        lengthOfCardNumber: (v) => v.length === 19 || 'length of card number must be 16 digits',
        onlyDigits: (v) => !/\D/g.test(v) || 'input should consist only of digits',
        cvcLength: (v) => v.length === 3 || 'length of cvc number must be 3 digits'
      }
    }
  },

  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    // arrayOfYears () {
    //   const arr = []
    //   let currentYear = Number(new Date().getFullYear())
    //   for (let item = 0; item <= 12; item++) {
    //     // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    //     arr.push(currentYear++)
    //   }
    //   return arr
    // }

  },
  methods: {
    addYears () {
      let currentYear = Number(new Date().getFullYear())
      for (let item = 0; item <= 12; item++) {
        this.years.push(currentYear++)
      }
    },
    sendData () {
      this.$store.dispatch('', {
        cardHolderName: this.cardHolderName,
        cardNumber: this.cardNumber,
        expDate: `${this.cardMonth}/${this.cardYear}`,
        cvc: this.cvc,
        amount: this.amount,
        checkbox: this.checkbox,
        checkbox2: this.checkbox2
      });

      ['cardHolderName', 'cardNumber', 'expDate', 'cvc', 'amount', 'checkbox', 'checkbox2'].forEach((item) => { this[item] = '' })
    },
    cardNumberValidation (e) {
      this.cardNumber = e
      const value = this.cardNumber.replace(/\D/g, '')
      if ((/^\d{0,16}$/).test(value)) {
        this.cardNumber = value.replace(/(\d{4})/, '$1 ').replace(/(\d{4}) (\d{4})/, '$1 $2 ').replace(/(\d{4}) (\d{4}) (\d{4})/, '$1 $2 $3 ')
      }
    },
    checkForm () {
      if (this.$refs.form.validate()) {
        this.sendData()
        // this.$router.push('/')
      }
    }
  },
  mounted () {
    this.addYears()
  }
}
</script>
