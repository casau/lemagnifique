module.exports = {
  siteMetadata: {
    title: `Amazing Pandas Eating Things`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: `gatsby-theme-tailwindcss`,
      options: {
        postCssPlugins: [require("autoprefixer")],
      }
    },
    {
      resolve: 'gatsby-source-remote-file',
      options: {
        url: 'https://my-json-server.typicode.com/casau/serve_json/sonates',
        name: 'sonates',
      },
    },
  ],  
}