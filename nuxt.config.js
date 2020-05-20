const config = require('./.contentful.json');
const webpack = require('webpack');

const contentful = require('contentful');

const client = contentful.createClient({
  space: config.CTF_SPACE_ID,
  accessToken: config.CTF_CDA_ACCESS_TOKEN
});

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
        content: "I'm front end developer based in Paris. Currently studying at Gobelins Paris and working at Purée Maison. Looking for a new traineeship for my next degree at Gobelins!"
      },
      {
        name: 'msapplication-TileColor',
        content: '#817674'
      },
      {
        name: 'theme-color',
        content: '#ffffff'
      },
      // { hid: 'og:image', property: 'og:image', content: '/ogImage.png' }
    ],
    link: [
      /*
      ** Favicon
      */
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', sizes:"180x180", type: 'image/png', href: '/apple-touch-icon.png' },
      { rel: 'icon', sizes:"32x32", type: 'image/png', href: '/favicon-32x32.png' },
      { rel: 'icon', sizes:"16x16", type: 'image/png', href: '/favicon-16x16.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#817674' },
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
    '~/plugins/contentful.client',
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    ['@nuxtjs/pwa', {
        manifest: {
          name: 'Léo Mouraire | Folio 2020',
          short_name: "Léo Mouraire",
          description: "I'm front end developer based in Paris. Currently studying at Gobelins Paris and working at Purée Maison. Looking for a new traineeship for my next degree at Gobelins!",
          lang: 'en',
          background_color: '#b0b0b0',
          theme_color: '#121111'
        }
      }
    ]
    ['@nuxtjs/google-analytics', {
      id: 'UA-165917651-1'
    }]
  ],
  /*
  ** PWA
  */
  // pwa: {
  //   manifest: {
  //     name: 'Léo Mouraire | Folio 2020',
  //     short_name: "Léo Mouraire",
  //     description: "I'm front end developer based in Paris. Currently studying at Gobelins Paris and working at Purée Maison. Looking for a new traineeship for my next degree at Gobelins!",
  //     lang: 'en',
  //     background_color: '#b0b0b0',
  //     theme_color: '#121111'
  //   }
  // },
  /*
  ** Nuxt.js modules
  */
  modules: [
  ],
  /*
  ** Server
  */
  server: {
    port: 3000, // par défaut: 3000
    host: 'localhost' // par défaut: localhost
  },
  /*
  ** Generate
  */
  generate: {
    routes() {
      return client.getEntries({
          'content_type': 'project',
          order: 'sys.createdAt'
      }).then((res) => {
          let routes = [];
          for (let i = 0; i < res.items.length; i++) {
            routes.push(`/projects/${i}`);
          }

          return routes;
      });
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    resolve: {
      three: 'node_modules/three/build/three.min.js',
    },
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
    BASE_URL: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://leomouraire.com',
    /*
    ** Contenful
    */
    CTF_SPACE_ID: config.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: config.CTF_CDA_ACCESS_TOKEN,
  }
}
