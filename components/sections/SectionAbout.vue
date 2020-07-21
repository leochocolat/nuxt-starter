<template>
  <section class="section-about">
      <div class="container section-about__container">
          <div class="section-about__content">
              <div class="section-about__introduction">
                <span class="tiny-word section-about__introduction-title">({{ title }})</span>
                <div class="paragraph rich-text section-about__paragraph js-scroll-paragraph" data-scroll>
                  <CustomRichTextRenderer :document="description" />
                </div>
              </div
              ><ul class="section-about__socials" data-scroll>
                  <li class="section-about__socials-item">
                    <button data-content="copy" class="section-about__socials-link section-about__socials-link--clipboard" @click="copyToClipBoard">
                      <div class="section-about__socials-link-label">
                        Email
                      </div>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384.67 384.67"><g data-name="Layer 2"><path fill="#fff" fill-rule="evenodd" d="M0 45.26l276.05 276.05H22.63v63.36h362.04V22.63h-63.36v253.42L45.26 0 0 45.26z" data-name="Layer 1"/></g></svg>
                    </button>
                      <!-- <a target="_blank" rel="noopener" :href="`mailto:${email}`" class="section-about__socials-link">
                        Email
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384.67 384.67"><g data-name="Layer 2"><path fill="#fff" fill-rule="evenodd" d="M0 45.26l276.05 276.05H22.63v63.36h362.04V22.63h-63.36v253.42L45.26 0 0 45.26z" data-name="Layer 1"/></g></svg>
                      </a> -->
                  </li>
                  <li class="section-about__socials-item">
                      <a data-content="twitter" target="_blank" rel="noopener" :href="twitter" class="section-about__socials-link">
                        <div class="section-about__socials-link-label">
                          Twitter
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384.67 384.67"><g data-name="Layer 2"><path fill="#fff" fill-rule="evenodd" d="M0 45.26l276.05 276.05H22.63v63.36h362.04V22.63h-63.36v253.42L45.26 0 0 45.26z" data-name="Layer 1"/></g></svg>
                      </a>
                  </li>
                  <li class="section-about__socials-item">
                      <a data-content="Linkedin" target="_blank" rel="noopener" :href="linkedin" class="section-about__socials-link">
                        <div class="section-about__socials-link-label">
                          Linkedin
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384.67 384.67"><g data-name="Layer 2"><path fill="#fff" fill-rule="evenodd" d="M0 45.26l276.05 276.05H22.63v63.36h362.04V22.63h-63.36v253.42L45.26 0 0 45.26z" data-name="Layer 1"/></g></svg>
                      </a>
                  </li>
              </ul>
          </div>
      </div>
  </section>
</template>

<script>
import CustomRichTextRenderer from '~/components/partials/CustomRichTextRenderer';

import SplitText from '~/assets/javascript/vendors/SplitText.js';

export default {
  components: {
    CustomRichTextRenderer
  },
  props: {
    title: {
      type: String,
      required: false
    },
    description: {
      type: Object,
      required: false
    },
    email: {
      type: String,
      required: false
    },
    twitter: {
      type: String,
      required: false
    },
    linkedin: {
      type: String,
      required: false
    },
  },
  computed: {

  },
  methods: {
    setup() {
      setTimeout(() => {
        this.setupScrollParagraph();
      }, 1000);
    },
    setupScrollParagraph() {
      let scrollParagraph = this.$el.querySelector('.js-scroll-paragraph');
      let originalContent = scrollParagraph.innerHTML;
      let splits = new SplitText(scrollParagraph, {
          type: 'lines',
          linesClass: 'line-container line-container--++',
      });

      let lines = [];

      for (let i = 0; i < splits.lines.length; i++) {
        const element = splits.lines[i];
        let line = new SplitText(element, {
          type: 'lines',
            linesClass: 'line line--++',
        }).lines;
        lines.push(line[0]);
      }

      lines[lines.length - 1].addEventListener('transitionend', () => {
        scrollParagraph.innerHTML = splits.originalHTML;
      });
    },
    copyToClipBoard() {
      let input = document.createElement('input');
      input.setAttribute('type', 'text');
      input.setAttribute('value', this.email);
      input.style.position = 'absolute';
      input.style.opacity = 0;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
    }
  },
  mounted() {
    this.setup();
  },
}
</script>

<style>
</style>
