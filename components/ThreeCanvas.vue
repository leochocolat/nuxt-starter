<template>
    <canvas>
        <div class="vertex">
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix 
                * modelViewMatrix 
                * vec4( position, 1.0 );
            }
        </div>
        <div class="fragment">
            varying vec2 vUv;
            uniform sampler2D u_texture;
            uniform sampler2D u_next_texture;
            uniform float u_transition;
            uniform float u_direction;


            void main () {
                vec2 uv_t = vec2(vUv.s, vUv.t);
                vec4 displace_current = texture2D(u_texture, uv_t);
                vec4 displace_next = texture2D(u_next_texture, uv_t);

                vec2 uv_displaced1 = vec2(vUv.x + (displace_current.g * u_direction) * u_transition, vUv.y);
                vec2 uv_displaced2 = vec2(vUv.x - (displace_next.g * u_direction) * (1. - u_transition), vUv.y);

                vec4 texture = mix(texture2D(u_texture, uv_displaced1), texture2D(u_next_texture, uv_displaced2), u_transition);

                gl_FragColor = texture;
            }
        </div>
    </canvas>
</template>

<script>
// import ThreeScene from '~/assets/javascript/components/ThreeScene';

export default {
  props: {

  },
  components: {

  },
  methods: {

  },
  mounted() {
    // new ThreeScene(this.$el);
  }
}
</script>

<style>
    canvas {
        position: fixed;
        left: 0;
        top: 0;
    }

    .fragment, .vertex {
        display: none;
    }
</style>
