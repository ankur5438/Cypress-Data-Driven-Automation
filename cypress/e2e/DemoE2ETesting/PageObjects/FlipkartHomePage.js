export class FlipkartHomePage {
  flipkartBody() {
    return cy.get(`html body`);
  }

  flipkartPopupCrossIcon() {
    return cy.xpath(`//*[text()="✕"]`);
  }
  flipkartCategoryLink(category) {
    // return cy.get(`[class="_3sdu8W emupdz"]`);
    return cy.xpath(
      "//*[text()='" +
        category +
        "']/ancestor::div[@aria-label='" +
        category +
        "']"
    );
  }

  flipkartCategoryOptions() {
    return cy.get(`._1BJVlg`);
  }
  flipkartCategorySubOptions() {
    return cy.get(`._3490ry`);
  }

  flipkartBrandInputBox() {
    return cy.get(`[placeholder="Search Brand"]`, { timeout: 10000 });
  }

  flipkartBrandSuggestionCheckbox() {
    return cy.get(`._4FO7b6`);
  }
  flipkartBrandSuggestionCheckboxInnerSelector() {
    return `[type="checkbox"]`;
  }

  flipkartProductNameAfterSearch() {
    return cy.get(`._13oc-S .s1Q9rs`);
  }

  flipkartProductTitleAfterOpen() {
    return cy.get(`.aMaAEs .B_NuCI`);
  }

  flipkartProductIframeAfterOpenInnerSelector() {
    return `.aut-iframe`;
  }

  flipkartProductAfterOpenInnerSelector() {
    return cy.get(`#container h1 > span`);
  }
}
