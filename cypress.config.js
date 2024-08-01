const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "mochawesome",
  reporterOptions: {
    overWrite: false,
  },
  env: {
    username: "jass2@gmail.com",
    password: "111",
  },
  e2e: {
    viewportHeight: 1080,
    viewportWidth: 1920,
    baseUrl: "https://coe-webstore.tdlbox.com",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
