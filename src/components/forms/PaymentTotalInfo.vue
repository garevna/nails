<template>
  <v-card flat class="homefone">
    <v-card-title> Total info</v-card-title>

    <PrevNextBtns @prev="$emit('prev')" @next="$emit('pay')" nextText="pay" nextIcon="mdi-credit-card-outline"/>
  </v-card>
</template>

<script>
import PrevNextBtns from '@/components/forms/PrevNextBtns.vue';

export default {
  name: 'PaymentTotalInfo',
  props: {
    submitObj: {
      type: Object,
      required: true,
    },
    deliveryCountry: {
      type: Object,
      required: true,
    },
  },
  components: {
    PrevNextBtns
  },
  data() {
    return {
    };
  },

  computed: {

  },
  methods: {},
  mounted() {
  },
};
</script>
