/// <reference types="Cypress" />

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

/**=================Remove Cypress Logging Requests================= */
const app = window.top;
if (!app.document.head.querySelector("[data-hide-command-log-request]")) {
  const style = app.document.createElement("style");
  style.innerHTML =
    ".command-name-request, .command-name-xhr { display: none }";
  style.setAttribute("data-hide-command-log-request", "");
  app.document.head.appendChild(style);
}
Cypress.Commands.overwrite("server", (originalFn, ...options) => {
  options[0].onAnyRequest = (route) => {
    route.abort();
  };
  return originalFn(...options);
});

/**=================CustomClick Command with Logging================= */
Cypress.Commands.add(
  "customClick",
  { prevSubject: "element" },
  (subject, elementName) => {
    cy.wrap(subject)
      .click()
      .then(() => {
        cy.log(`Clicked on element Named: ${elementName}`);
      });
  }
);

/**=================CustomType Command with Logging================= */
Cypress.Commands.add(
  "customType",
  { prevSubject: "element" },
  (subject, value) => {
    cy.wrap(subject)
      .type(value)
      .then(() => {
        cy.log(`Pass the Value: ${value}`);
      });
  }
);

/**=================Return Iframe on basis of Selector either string or element ================= */
Cypress.Commands.add("IframeLoad", (selector, options) => {
  if (typeof selector === "string") {
    return cy.get(selector).its("0.contentDocument.body").then(cy.wrap);
  } else if (typeof selector === "element") {
    return selector.its("0.contentDocument.body").then(cy.wrap);
  }
});

/**=================Return Rows Data with Keys as column Headers from XLSX File================= */
Cypress.Commands.add("generateJSONFromExcel", (filePath, sheetName) => {
  return cy.readFile(filePath, "binary").then((fileContent) => {
    const xlsx = require("xlsx");
    const wb = xlsx.read(fileContent, { type: "binary", dateNF: "mm/dd/yyyy" });
    const ws = wb.Sheets[sheetName];

    // Convert sheet data to JSON array
    const jsonData = xlsx.utils.sheet_to_json(ws, { header: 1 });

    // Extract headers (first row in Excel) to use as keys
    const headers = jsonData[0];

    // Remove headers from the data array
    const data = jsonData.slice(1);

    // Create an array of objects where each object represents a row
    const result = data.map((row) => {
      const rowObject = {};
      headers.forEach((header, index) => {
        rowObject[header] = row[index];
      });
      return rowObject;
    });

    // Return the result for further chaining
    return result;
  });
});

import "cypress-downloadfile/lib/downloadFileCommand";

Cypress.Commands.add(
  "downloadFile",
  { prevSubject: true },
  (subject, downloadUrl, fileName) => {
    cy.wrap(subject).downloadFile({
      method: "GET",
      url: downloadUrl,
      filePath: `downloads/${fileName}`,
    });
  }
);

/**=================get latest downloaded file name================= */

Cypress.Commands.add("getLatestFile", { prevSubject: false }, (folderPath) => {
  const formattedFolderPath =
    Cypress.platform === "win32" ? `"${folderPath}"` : folderPath;
  const command =
    Cypress.platform === "win32"
      ? `dir /b /od ${formattedFolderPath}`
      : `ls -t ${formattedFolderPath}`;

  return cy.exec(command).then(({ stdout }) => {
    const files = stdout.trim().split("\n");
    return files.length > 0 ? files[files.length - 1] : null; // On Windows, the latest file is listed at the end (oldest to newest).
  });
});

/**=================find the list of files inside folder================= */
Cypress.Commands.add("listFilesInFolder", (folderPath) => {
  const listCommand =
    Cypress.platform === "win32"
      ? `dir /b "${folderPath}"`
      : `ls -1 "${folderPath}"`;
  return cy
    .exec(listCommand)
    .its("stdout")
    .then((stdout) => {
      // Extract only the lines containing file names using line breaks
      const fileLines = stdout
        .split(/\r?\n/)
        .filter((line) => line.trim() !== "");

      // Extract file names from the lines
      const fileNames = fileLines.map((line) => {
        const matches = line.match(/[^\\/:*?"<>|]+$/);
        return matches ? matches[0] : "";
      });

      return fileNames;
    });
});

/**=================Return Rows Data from XLSX File As It Is================= */
Cypress.Commands.add("generateJSONFromExcelOnlyRows", (filePath, sheetName) => {
  cy.readFile(filePath, "binary").then((fileContent) => {
    const xlsx = require("xlsx");
    const wb = xlsx.read(fileContent, { type: "binary", dateNF: "mm/dd/yyyy" });
    const ws = wb.Sheets[sheetName];

    // Convert sheet data to JSON array
    const jsonData = xlsx.utils.sheet_to_json(ws, { header: 1 });
  

    // Return the result for further chaining
    return jsonData;
  });
});

require("@4tw/cypress-drag-drop");
