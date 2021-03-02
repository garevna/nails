<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" xs="12" offset-md="2" md="8" class="player-container" v-if="!loading && video">
        <video-player class="vjs-custom-skin" ref="videoPlayer" :options="playerOptions"> </video-player>
      </v-col>
      <v-col cols="12" xs="12" offset-md="2" md="8" v-if="!loading && video">
        <v-card flat class="transparent">
          <!-- <v-card-title class="d-flex justify-center justify-sm-start">On this course:</v-card-title> -->
          <v-card-text>
            <p v-for="(item, index) in descriptions" :key="index" class="text--text">
              {{ item }}
            </p>
          </v-card-text>
          <!-- <v-card-text>{{ course.infoForBonus }}</v-card-text> -->
        </v-card>
      </v-col>
      <v-col cols="12" xs="12" offset-md="2" md="8" v-if="!loading && video">
        <CoverImage :url="linkCheck(video)" :width="'100%'" :height="'auto'" />
        <v-card flat class="d-flex justify-center my-16">
          <VideoPdfs :disabled="published" />
        </v-card>
      </v-col>
      <v-col cols="12" v-if="!showForm" xs="12">
        <div class="d-flex justify-center mt-8">
          <v-btn
            :disabled="published"
            rounded
            color="buttons"
            large
            min-width="160"
            class="yellow-button"
            @click="showForm = true"
          >
            Edit
          </v-btn>
        </div>
      </v-col>
      <v-col v-if="showForm" cols="12" xs="12" offset-md="3" md="6" offset-lg="4" lg="4">
        <v-form ref="form-video">
          <div v-for="(item, name) in data" :key="name">
            <TextInput
              v-if="schema[name].type === 'text'"
              :value.sync="data[name]"
              :label="schema[name].label"
              :limit="schema[name].limit"
              :required="schema[name].required"
            />
            <div v-if="schema[name].type === 'file'" class="my-4">
              <v-btn v-if="valInput(name)" @click="data[name] = null" color="buttons" rounded small outlined primary>
                change file
              </v-btn>
              <FileInput
                v-else
                :value.sync="data[name]"
                :label="schema[name].label"
                :icon="schema[name].icon"
                :size="schema[name].size"
                :accept="schema[name].accept"
                :required="schema[name].required"
              />
            </div>

            <TextAreaInput
              v-if="schema[name].type === 'textarea'"
              :value.sync="data[name]"
              :label="schema[name].label"
              :limit="schema[name].limit"
              :required="schema[name].required"
            />
          </div>
        </v-form>
        <div class="d-flex flex-column align-center flex-sm-row justify-sm-center">
          <v-btn
            rounded
            color="buttons"
            large
            min-width="160"
            class="yellow-button my-8 my-sm-0 mr-sm-4"
            @click="closeForm"
            >Cancel</v-btn
          >
          <v-btn rounded color="buttons" large min-width="160" class="yellow-button" @click="sendData">Submit</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import { mapState, mapActions } from 'vuex';

import 'video.js/dist/video-js.css';
import { videoPlayer } from 'vue-video-player';

import CoverImage from '@/components/CoverImage.vue';
import VideoPdfs from '@/components/courses/VideoPdfs.vue';
import checkVideoLink from '@/helpers/checkVideoLink';
import TextInput from '@/components/inputs/TextInput.vue';
import TextAreaInput from '@/components/inputs/TextAreaInput.vue';
import FileInput from '@/components/inputs/FileInput.vue';

const schema = require('@/config/editLessonSchema').default;

export default {
  name: 'UserCourseDetailVideo',
  components: {
    CoverImage,
    VideoPdfs,
    TextInput,
    TextAreaInput,
    FileInput,
    videoPlayer,
  },
  data() {
    return {
      loading: false,
      volume: 0,
      showForm: false,
      schema,
      data: Object.entries(schema).reduce((acc, [key, value]) => {
        let field = '';
        if (value.type === 'file') field = null;
        return Object.assign(acc, { [key]: field });
      }, {}),
    };
  },
  computed: {
    ...mapState('courses', ['course', 'video']),
    descriptions() {
      return this.video?.description
        ? this.video.description
            .split('\n')
            .map(str => str.trim())
            .filter(str => str)
        : [];
    },
    playerOptions() {
      return {
        // width: '100%',
        // height: '100%',
        // autoplay: true,
        // muted: true,
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          {
            type: 'video/mp4',
            src: this.video?.link,
          },
        ],
        // poster: this.video?.coverImg?.link,
      };
    },
    published() {
      return this?.course?.isPublished;
    },
  },
  watch: {
    showForm(val) {
      if (!val) return;
      this.fillingFields();
    },
  },
  methods: {
    ...mapActions('courses', {
      getCourse: 'GET_COURSE',
      putVideo: 'PUT_VIDEO',
      getFindVideo: 'GET_FIND_VIDEO',
    }),
    linkCheck(video) {
      return checkVideoLink(video);
    },
    valInput(name) {
      return !(this.data[name] === null || this.data[name] instanceof File);
    },
    closeForm() {
      this.showForm = false;
    },
    fillingFields() {
      if (this.video) {
        Object.keys(this.data).forEach(key => {
          this.data[key] = this.video[key];
        });
      }
    },
    noObjNull(val) {
      return val === null || (typeof val === 'object' && !(val instanceof File));
    },
    sendData() {
      if (!this.$refs['form-video'].validate()) return;
      this.data.description = this.data.description
        .split(' ')
        .filter(str => str)
        .join(' ');
      const fd = new FormData();
      Object.entries(this.data).forEach(([name, value]) => {
        if (this.noObjNull(value)) return;
        if (value instanceof File) fd.append('file', value);
        else fd.append(name, value);
      });
      this.putVideo({
        fd,
        id: this.$route.params.lessonid,
      });
      this.showForm = false;
    },
    async get() {
      await this.getCourse(this.$route.params.courseid);
      await this.getFindVideo(this.$route.params.lessonid);
    },
  },
  created() {
    this.get();
  },
  mounted() {},
};
</script>

<style>
.vjs_video_3-dimensions {
  height: unset;
  width: unset;
}
.video-js {
  width: 100%;
  height: 500px;
}
.video-js .vjs-big-play-button {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
