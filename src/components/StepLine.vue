<template>
  <v-stepper flat alt-labels class="homefone" elevation="0" v-model="localStep">
    <v-stepper-header flat elevation="0">
      <template v-for="(i,index) in steps">
      <v-stepper-step  :step="index + 1" :complete="index < currentStep" :key="i.type + index">
        <span class="stepper">STEP {{index + 1}}</span>
      </v-stepper-step>
      <v-divider v-if="index !== steps.length - 1" :class="{complete: index + 1 < currentStep}" :key="i.type"/>
      </template>
      <!-- <v-stepper-step  step=""  :complete="2 <= currentStep">
        <span class="stepper">STEP 2</span>
      </v-stepper-step>
      <v-divider :class="{complete: 3 <= currentStep}"></v-divider>
      <v-stepper-step  step="" :complete="3 <= currentStep">
        <span class="stepper">STEP 3</span>
      </v-stepper-step> -->
    </v-stepper-header>
  </v-stepper>
</template>

<style scoped lang="scss">
.stepper{
  font-weight: 400;
  font-size: 14px;
}
</style>

<script>
export default {
  name: 'StepLine',
  props: {
     steps:{
      type: Array,
      required: true
    },
    currentStep:{
      type: Number,
      default: 1
    },
  },
  computed: {
    localStep: {
      get() {
        return this.currentStep + 1
      }
    }
  }
}
</script>
