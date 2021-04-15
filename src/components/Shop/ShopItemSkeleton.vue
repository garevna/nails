<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="8" lg="11" offset-lg="1" offset-md="4" offset="0">
        <v-row>
          <v-col cols="6">
            <v-skeleton-loader height="400px" type="image@2"></v-skeleton-loader>
            <v-row class="pa-10 d-flex justify-space-between">
              <v-skeleton-loader height="100px" width="25%" type="image"></v-skeleton-loader>
              <v-skeleton-loader height="100px" width="25%" type="image"></v-skeleton-loader>
              <v-skeleton-loader height="100px" width="25%" type="image"></v-skeleton-loader>
            </v-row>
          </v-col>

          <v-col cols="12" sm="12" md="5" xl="4" lg="4" class="px-0">
            <v-skeleton-loader height="50px" type="heading"></v-skeleton-loader>
            <v-skeleton-loader height="100px" width="20%" type="text"></v-skeleton-loader>
            <v-skeleton-loader width="100%" type="paragraph@7"></v-skeleton-loader>
            <v-row class="py-10 d-flex justify-end">
              <v-skeleton-loader type="button"></v-skeleton-loader>
              <v-skeleton-loader type="button"></v-skeleton-loader>
            </v-row>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6" md="4" lg="3" class="px-5 pb-2" v-for="i in 4" :key="i">
            <v-card class="pa-0 pt-0 mt-0" color="lgrey">
              <v-skeleton-loader type="image, list-item-three-line" animation></v-skeleton-loader>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>
