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
    auth0_password: "Fourx4eyesdev$",
    auth0_domain: "httpsdev-rba1pzy2o2f8we1a.us.auth0.com",
    auth0_audience:"https://dev-rba1pzy2o2f8we1a.us.auth0.com/api/v2/",
    auth0_scope: "openid%20profile%20email&",
    auth0_client_id: "K75OSESBnYEHisdJXkM6YPIF15aQyw8K",
  }

});