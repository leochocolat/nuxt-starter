const webpack = require('webpack');

export default {
  mode: 'universal',
  head: {
    title: 'Nuxt Starter',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: ""
      },
      {
        name: 'msapplication-TileColor',
        content: '#ffffff'
      },
      {
        name: 'theme-color',
        content: '#ffffff'
      },
      // { hid: 'og:image', property: 'og:image', content: '/ogImage.png' }
    ],
    link: [
      /*
      ** Favicons
      */
      // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // { rel: 'apple-touch-icon', sizes:"180x180", type: 'image/png', href: '/apple-touch-icon.png' },
      // { rel: 'icon', sizes:"32x32", type: 'image/png', href: '/favicon-32x32.png' },
      // { rel: 'icon', sizes:"16x16", type: 'image/png', href: '/favicon-16x16.png' },
      // { rel: 'manifest', href: '/site.webmanifest' },
      // { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#817674' },
    ]
  },
  /*
  ** Customize the progress-bar
  */
  loading: { color: 'transparent', height: 0 },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/scss/app.scss'
  ],
  plugins: [
    '~/plugins/listeners.client',
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [],
  /*
  ** Nuxt.js modules
  */
  modules: [
  ],
  /*
  ** Server
  */
  server: {
    port: 3000, // default: 3000
    host: 'localhost' // default: localhost
  },
  /*
  ** Generate
  */
  generate: {
    routes() {
      let routes = [''];
      return routes;
    },
    fallback: '200.html'
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    plugins: [],
    extend (config, ctx) {
      config.module.rules.push({
        test: /\.(glsl|vs|fs)$/,
        loader: 'raw-loader'
      });
      if (ctx.isClient) {
        config.module.rules.push({
          test: /\.worker\.js$/,
          use: { loader: 'worker-loader' },
          exclude: /(node_modules)/
        });
      }
    }
  },
  env: {
    BASE_URL: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : ''
  }
}
