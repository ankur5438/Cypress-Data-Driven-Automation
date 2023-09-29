import { FileSamplePage } from "../PageObjects/FileSamplePage";
import { expect } from "chai";

class FileSampleBusinessLayer extends FileSamplePage {
  clickOnFileDownloadAndReadIt(fileName, sheet) {
    const downloadFolderPath = "cypress/downloads";
    cy.log("Folder Path is" + downloadFolderPath);
    super
      .fileDownloadButton(fileName)
      .click()
      .then(() => {
        cy.wait(5000);

        cy.getLatestFile(downloadFolderPath).then((latestFileName) => {
          // If no file found, the test should fail
          if (!latestFileName) {
            throw new Error("No downloaded file found.");
          } else {
            cy.log("New file Name is : " + latestFileName);

            let tempFileName = fileName.replace(".xlsx", "");
            expect(latestFileName).to.include(tempFileName);

            const filePath = downloadFolderPath + "/" + latestFileName; // Update the file extension for XLSX
            const sheetName = sheet;

            cy.readFile(filePath)
              .should("exist")
              .then(() => {
                //verify XLSX data
                cy.generateJSONFromExcel(filePath, sheetName).then((result) => {
                  result.forEach((row) => {
                    for (const key in row) {
                      if (row.hasOwnProperty(key)) {
                        cy.log(`${key}: ${row[key]}`);
                      }
                    }
                  });
                });
              });
          }
        });
      });
  }

  xlsxfileDatReadOnBasisOfColumnAndRowData(
    fileName,
    sheet,
    columnName,
    firstColumnData
  ) {
    const downloadFolderPath = "cypress/downloads";
    cy.log("Folder Path is" + downloadFolderPath);

    cy.getLatestFile(downloadFolderPath).then((latestFileName) => {
      // If no file found, the test should fail
      if (!latestFileName) {
        throw new Error("No downloaded file found.");
      } else {
        cy.log("New file Name is : " + latestFileName);

        let tempFileName = fileName.replace(".xlsx", "");
        expect(latestFileName).to.include(tempFileName);

        const filePath = downloadFolderPath + "/" + latestFileName; // Update the file extension for XLSX
        const sheetName = sheet;

        cy.readFile(filePath)
          .should("exist")
          .then(() => {
            //verify XLSX data
            cy.generateJSONFromExcelOnlyRows(filePath, sheetName).then(
              (result) => {
                result[0].forEach((value, index, arry) => {
                  if (value == columnName) {
                    result.forEach((val, ind, arr) => {
                      if (val[0] == firstColumnData) {
                        cy.log(`Val is: ${result[ind][index]}`);
                        return result[ind][index];
                      }
                    });
                  }
                });
              }
            );
          });
      }
    });
  }
}

export default FileSampleBusinessLayer;