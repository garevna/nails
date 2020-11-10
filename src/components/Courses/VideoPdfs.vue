<template>
  <div>
    <div class="d-flex">
      <div>
        <div v-if="pdfs[0] && pdfFileShow1" class="pdf-container pt-12">
          <a :href="pdfs[0].link" target="_blank" class="mt-8"
            ><v-img src="@/assets/images/pdf.svg" width="50px"
          /></a>

          <v-icon
            large
            class="remove-pdf"
            @click="
              pdfFileShow1 = false;
              pdfFileId1 = pdfs[0]._id;
            "
            >mdi-close-circle-outline</v-icon
          >
        </div>
        <div v-else>
          <v-file-input v-model="pdfFile1" />
          <!-- <v-btn @click="$refs.fileInput1.click()">Pick file</v-btn> -->
          <!-- <v-btn @click="open">Pick file</v-btn> -->
        </div>
      </div>
      <div>
        <div v-if="pdfs[1] && pdfFileShow2" class="pdf-container pt-12 mx-16">
          <a :href="pdfs[1].link" target="_blank" class="pdf-link"
            ><v-img src="@/assets/images/pdf.svg" width="50px"
          /></a>
          <v-icon
            large
            class="remove-pdf"
            @click="
              pdfFileShow2 = false;
              pdfFileId2 = pdfs[1]._id;
            "
            >mdi-close-circle-outline</v-icon
          >
        </div>

        <div v-else class="mx-16">
          <v-file-input v-model="pdfFile2" />
          <!-- <v-btn @click="$refs.fileInput2.click()">Pick file</v-btn> -->
        </div>
      </div>
      <div>
        <div v-if="pdfs[2] && pdfFileShow3" class="pdf-container pt-12">
          <a :href="pdfs[2].link" target="_blank" class="pdf-link"
            ><v-img src="@/assets/images/pdf.svg" width="50px"
          /></a>
          <v-icon
            large
            class="remove-pdf"
            @click="
              pdfFileShow3 = false;
              pdfFileId3 = pdfs[2]._id;
            "
            >mdi-close-circle-outline</v-icon
          >
        </div>

        <div v-else>
          <v-file-input v-model="pdfFile3" />
          <!-- <v-btn @click="$refs.fileInput13.click()">Pick file</v-btn> -->
        </div>
      </div>
    </div>
    <div v-if="!pdfFileShow1 || !pdfFileShow2 || !pdfFileShow3" class="my-8 d-flex justify-space-around">
      <v-btn @click="reset">Cansel</v-btn>
      <v-btn>Submit</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: ['pdfs'],
  data () {
    return {
      pdfFile1: null,
      pdfFile2: null,
      pdfFile3: null,
      pdfFileId1: null,
      pdfFileId2: null,
      pdfFileId3: null,
      pdfFileShow1: true,
      pdfFileShow2: true,
      pdfFileShow3: true
    }
  },
  methods: {
    reset () {
      this.pdfFile1 = null
      this.pdfFile2 = null
      this.pdfFile3 = null
      this.pdfFileId1 = null
      this.pdfFileId2 = null
      this.pdfFileId3 = null
      this.pdfFileShow1 = true
      this.pdfFileShow2 = true
      this.pdfFileShow3 = true
    }
  }
}
</script>

<style scoped>
.pdf-container {
  position: relative;
}
.remove-pdf {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}
/* .pdf-link {
  padding-top: -50px;
} */
</style>
