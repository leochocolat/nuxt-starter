const config = require('./.contentful.json');
const webpack = require('webpack');

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Work In Progress - Stay Tuned',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: "I'm front end developper base in Paris. Currently studying at Gobelins Paris and working at Purée Maison. Looking for a new traineeship for my new degree at Gobelins!"
      },
      // { hid: 'og:image', property: 'og:image', content: '/ogImage.png' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff', height: 0 },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/scss/app.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/listeners.client',
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
  ],
  /*
  ** Server
  */
  server: {
    port: 1234, // par défaut: 3000
    host: 'localhost' // par défaut: localhost
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    plugins: [
      new webpack.ProvidePlugin({
        THREE: 'three',
      }),
    ],
    extend (config, ctx) {
      config.module.rules.push({
        test: /\.(glsl|vs|fs)$/,
        loader: 'raw-loader'
      })
    }
  },
  env: {
    /*
    ** Contenful
    */
    CTF_SPACE_ID: config.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: config.CTF_CDA_ACCESS_TOKEN,
  }
}
