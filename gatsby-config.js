require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
module.exports = {
  siteMetadata: {
    title: "Carbonwave - Seaweed for Carbon Drawdown & Ocean Restoration",
    description: "We Restore Oceans, Drawdown Carbon, and Beat Climate Change by turning Caribbean Sargassum Seaweed into Organic & Biodegradable Extracts.",
    author: "@carbon_wave",
    keywords: "change in climate, carbon offset, climate change solution, carbon footprint calculator, carbon emission, carbon sequestration, carbon drawdown, carbon neutral, carbon sink, algae blooms, Caribbean Sargassum, Caribbean seaweed, seaweed fertilizer, organic seaweed fertilizer, kelp fertilizer, seaweed foliar spray, seaweed extract, macro algae",
    siteUrl: "https://carbonwave.com"
  },
  plugins: [
    'gatsby-plugin-resolve-src',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-remove-serviceworker',
    'gatsby-plugin-sass',
    'gatsby-plugin-top-layout', // fixes FOUC for Material v5 and withStyles
    'gatsby-plugin-mui-emotion', // fixes FOUC for Material v5 and withStyles
    'gatsby-plugin-netlify',
    'gatsby-plugin-netlify-cms',
    'gatsby-plugin-loadable-components-ssr',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Carbonwave',
        short_name: 'starter',
        start_url: '/',
        background_color: '#0d60c0',
        theme_color: '#0d60c0',
        display: 'minimal-ui',
        icon: 'src/assets/img/favicon.png', // This path is relative to the root of the site.
        icons: [
          {
            src: `icons/icon-192x192.png`,
            sizes: `256x256`,
            type: `image/png`,
          },
        ], // Add or remove icon sizes as desired
      },
    },
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/assets`,
        name: 'assets',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/sections`,
        name: 'sections',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/templates/blogpage`,
        name: 'templates',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/assets`,
        name: 'assets',
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        // Footnotes mode (default: true)
        footnotes: true,
        // GitHub Flavored Markdown mode (default: true)
        gfm: true,
        // Plugins configs
        plugins: [],
      },
    },
    {
      resolve: `gatsby-source-twitter`,
      options: {
        credentials: {
          consumer_key: process.env.TWITTER_CONSUMER_KEY,
          consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
          bearer_token: process.env.TWITTER_BEARER_TOKEN,
        },
        queries: {
          cCombinatorTimeline: {
            endpoint: "statuses/user_timeline",
            params: {
              screen_name: "carbon_wave",
              include_rts: true,
              exclude_replies: true,
              tweet_mode: `extended`,
              count: 6,
            },
          },
        },
      },
    },
    {
      resolve: 'gatsby-plugin-i18n',
      options: {
        langKeyForNull: 'en',
        langKeyDefault: 'en',
        useLangKeyLayout: true,
        prefixDefault: false,
        pagesPaths: [ 'src/templates/blogpage', 'src/pages' ]
      }
    },
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: process.env.GOOGLE_TAGMANAGER_ID,
        // Include GTM in development.
        //
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: false,
        // Defaults to false
        enableWebVitalsTracking: true,
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          process.env.GOOGLE_ANALYTICS_ID, // Google Analytics / GA
          // "AW-CONVERSION_ID", // Google Ads / Adwords / AW
          // "DC-FLOODIGHT_ID", // Marketing Platform advertising products (Display & Video 360, Search Ads 360, and Campaign Manager)
        ],
      },
    },
    {
      resolve: "gatsby-source-hubspot-forms",
      options: {
        apiKey: process.env.HUBSPOT_API_KEY, // Hubspot API key
      },
    },
  ],
  proxy: {
    prefix: "/.netlify/functions",
    url: "http://localhost:9000",
  },
}