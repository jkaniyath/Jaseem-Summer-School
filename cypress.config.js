const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter : 'mochawesome',
  reporterOptions: {
    overWrite: false
  },
  env : {
    username : 'jass2@gmail.com',
    password : '111'
  },
  e2e: {

    baseUrl: "https://coe-webstore.tdlbox.com",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
