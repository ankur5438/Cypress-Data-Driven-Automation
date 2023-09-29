export class FileSamplePage {
  fileDownloadButton(fileName) {
    return cy.xpath(
      "//div[normalize-space(text())='" + fileName + "']/following-sibling::a"
    );
  }
}
