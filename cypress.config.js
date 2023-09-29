const { defineConfig } = require("cypress");
const {downloadFile} = require('cypress-downloadfile/lib/addPlugin')

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  env: {
    flipkartURL: "https://www.flipkart.com/",
    alertURL: "https://demo.automationtesting.in/Alerts.html",
    demoQAURL: "https://demoqa.com/",
    globalSQA: "https://www.globalsqa.com/demo-site/draganddrop/",
    excelFileDownloadURL: "https://filesamples.com/formats/xlsx",
    downloadFolderPath: "cypress/downloads",
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require("cypress-mochawesome-reporter/plugin")(on);

      //     on("task",
      // {
      //   generateJSONFromExcel : generateJSONFromExcel,

      // })
      on('task',{downloadFile})
    },
  },

  viewportWidth: 1920, // Set default viewport width to 1920 pixels
  viewportHeight: 1080,

  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportFilename: "HTMLReport",
    overwrite: false,
    html: true,
    json: true,
    quiet: true,
    timestamp: "ddmmyyyy_HHMMss",
  },

  pageLoadTimeout: 120000,
  downloadsFolder:"cypress/downloads" 
});