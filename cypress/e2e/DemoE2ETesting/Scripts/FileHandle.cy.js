import FileSampleBusinessLayer from "../PagesBusinessLogics/FileSampleBusinessLayer";

describe("Downloaded File Read", () => {
  let fileHandleData;
  before(() => {
    cy.fixture("FileHandle.json").then((data) => {
      fileHandleData = data;
    });
  });
  beforeEach(() => {
    cy.visit(Cypress.env("excelFileDownloadURL"));
  });

  const FileSampleActions = new FileSampleBusinessLayer();
  it("File Read", () => {
    FileSampleActions.clickOnFileDownloadAndReadIt(
      fileHandleData.fileName,
      fileHandleData.sheetName
    );
  });
});
