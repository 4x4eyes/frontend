const { defineConfig } = require("cypress");

require('dotenv').config()

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },

  env: {
    auth0_username: "fourbyfoureyes@yahoo.com",
    auth0_password: process.env.AUTH0_PASSWORD,
    auth0_domain: "httpsdev-rba1pzy2o2f8we1a.us.auth0.com",
    auth0_audience: process.env.REACT_APP_AUTH0_AUDIENCE,
    auth0_scope: process.env.REACT_APP_AUTH0_SCOPE,
    auth0_client_id: process.env.REACT_APP_AUTH0_CLIENTID,
  }

});
