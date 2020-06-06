<template>
  <div class="video-player">
    <video v-if="videos" class="video-player__video js-video" muted autoplay playsinline>
        <source :src="getVideoSources()[0]" type="video/mp4">
        <source :src="getVideoSources()[1]" type="video/webm">
        <p>This browser does not support the video element.</p>
    </video>
    <picture class="video-player__picture js-poster">
        <source type="image/webp"
            :srcset="`${images[0].fields.file.url} 2000w,
                    ${images[1].fields.file.url}  1000w,
                    ${images[2].fields.file.url}  500w`"
        >
        <img class="video-player__image"
            :src="images[3].fields.file.url"
            :width="images[1].fields.file.details.image.width"
            :height="images[1].fields.file.details.image.height"
            :alt="images[0].fields.title"
        >
    </picture>
    <div v-if="videos" class="video-player__progress-container js-progress-bar">
        <div class="video-player__progress js-progress"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import breakpoints from '~/assets/javascript/variables/breakpoints';
import VideoPlayerComponent from '~/assets/javascript/components/VideoPlayerComponent';

export default {
  props: {
    images: {
      type: Array,
      required: false
    },
    videos: {
      type: Array,
      required: false
    },
  },
  methods: {
    setup() {
      if (!this.videos) return;

      this._videoplayerComponent = new VideoPlayerComponent({ el: this.$el });

      setTimeout(() => {
        this._videoplayerComponent.enableControls();
      }, 2000);
      
    },
    getVideoSources() {
      let videos = this.videos;

      if (this.viewport.width < breakpoints.regular) {
        videos = [this.videos[2], this.videos[3]];
      }

      if (!this.videos) return ['', ''];

      return videos
    }
  },
  computed: {
    ...mapGetters({
      viewport: ['device/viewportSize'],
    }),
  },
  mounted() {
    this.setup();
  },
  beforeDestroy() {
    if (!this._videoplayerComponent) return;
    this._videoplayerComponent.close();
  }
}
</script>

<style>
</style>
