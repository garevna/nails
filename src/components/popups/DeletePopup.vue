<template>
  <!-- <v-dialog v-model="dialog" :retain-focus="false" persistent max-width="320"> -->
  <v-dialog v-model="localDialog" persistent max-width="320">
    <v-card>
      <v-card-title> Do you really want to remove this {{ name }} ?</v-card-title>
      <v-card-actions class="justify-center">
        <v-btn color="buttons" rounded large class="yellow-button" text @click="cancelHandler"> Disagree </v-btn>
        <v-btn color="buttons" rounded large class="yellow-button" text @click="deleteHandler"> Agree </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'DeletePopup',
  props: ['cancelHandler', 'deleteHandler', 'name', 'dialog'],
  computed: {
    localDialog: {
      get() {
        return this.dialog;
      },
      set(val) {
        this.$emit('update:dialog', val);
      },
    },
  },
};
</script>

<style></style>
