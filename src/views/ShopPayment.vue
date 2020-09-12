<template>
  <v-container fluid fill-height class="whitefone align-start">
    <v-card flat class="transparent mx-auto" max-width="1440" width="100%">
      <MainMenu :light="true" :top="true" />
      <PaymentDetailsForm :light="true" />
    </v-card>
  </v-container>
</template>

<style lang="scss">
@import "@/css/variables.scss";
.pagination-buttons {
  button {
    outline: none !important;
  }
}
.empty-message {
  height: 100%;
  text-align: center;
  color: $shopGrayFont;
}
</style>

<script>
import { mapState } from "vuex";
import MainMenu from "@/components/MainMenu.vue";
import PaymentDetailsForm from "@/components/forms/PaymentDetailsForm.vue";
export default {
  name: "Shop",
  components: { MainMenu, PaymentDetailsForm },
  data() {
    return {};
  },
  computed: {
    ...mapState(["viewportWidth"]),
    mobileMenu() {
      return this.viewportWidth < 960;
    }
  },
  watch: {},
  methods: {},
  mounted() {
    this.$vuetify.theme.themes.light.homefone = this.$vuetify.theme.themes.light.whitefone;
  },
  beforeDestroy() {
    this.$vuetify.theme.themes.light.homefone = this.$vuetify.theme.themes.light.secondaryGray;
  }
};
</script>
