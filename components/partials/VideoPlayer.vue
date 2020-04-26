<template>
  <div class="video-player">
    <!-- <video class="video-player__video js-video" muted autoplay playsinline>
        <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.webm" type="video/webm">
        <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.mp4" type="video/mp4">
        <p>This browser does not support the video element.</p>
    </video> -->
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
    <!-- <div class="video-player__progress-container js-progress-bar">
        <div class="video-player__progress js-progress"></div>
    </div> -->
  </div>
</template>

<script>
// import VideoPlayerComponent from '~/assets/javascript/components/VideoPlayerComponent';

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
        //   this._videoplayerComponent = new VideoPlayerComponent({ el: this.$el })
      }
  },
  mounted() {
    this.setup();
  },
  beforeDestroy() {
    //   this._videoplayerComponent.close();
  }
}
</script>

<style>
</style>
