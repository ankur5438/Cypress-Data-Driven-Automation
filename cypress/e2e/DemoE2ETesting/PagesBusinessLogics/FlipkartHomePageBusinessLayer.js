// const {
//   default: FlipkartHomePage,
// } = require("../PageObjects/FlipkartHomePage.cy");

import { FlipkartHomePage } from "../PageObjects/FlipkartHomePage";

class FlipkartHomePageBusinessLayer extends FlipkartHomePage {
  selectCatagoryAndSubCategory(category, options, subOptions) {
    super
      .flipkartBody()
      .invoke("attr", "class")
      .then((attributeValue) => {
        if (attributeValue === undefined) {
          cy.log("No Login Pop up open with class Value" + attributeValue);
        } else {
          cy.log("The attribute value is   -" + attributeValue);
          super.flipkartPopupCrossIcon().click();
        }
      });

    // try {
    //   cy.xpath(`//*[text()="✕"]`, { timeout: 10000 });
    // } catch (error) {
    //   cy.log("Error Occured");
    // }

    // try {
    //   cy.xpath(`//*[text()="✕"]`, { timeout: 10000 });
    // } catch (error) {
    //   cy.log("Error Occured");
    // }

    super
      .flipkartCategoryLink(category)
      .should("be.visible")
      .trigger("mouseover");

    super
      .flipkartCategoryOptions()
      .contains(options)
      .should("be.visible")
      .trigger("mouseover");
    super
      .flipkartCategorySubOptions()
      .contains(subOptions)
      .should("be.visible")
      .trigger("mouseover")
      .customClick(subOptions);
  }

  searchAndSelectBrandsFromFlterSection(brandName) {
    super.flipkartBrandInputBox().should("be.visible").customType(brandName);

    super
      .flipkartBrandSuggestionCheckbox()
      .contains(brandName, {
        matchCase: false,
      })
      .find(super.flipkartBrandSuggestionCheckboxInnerSelector())

      .should("not.be.checked")
      .check({ force: true })
      .should("be.checked");
  }

  clickOnFlipkartProductAfterSearch(productName) {
    return new Promise((resolve, reject) => {
      let actualFirstText = "";
      let actualSecondText = "";
      let actualText = null;
      let tabAttributeValue;
      let actualProductNameBeforeOpenProduct;
      let actualProductArray;

      super
        .flipkartProductNameAfterSearch()
        .contains(productName)
        .should("be.visible")
        .within((ele) => {
          actualFirstText = ele.text();

          cy.wrap(ele)
            .invoke("attr", "target")
            .then((att) => {
              tabAttributeValue = att;
              cy.log("Target Value is: " + tabAttributeValue);
            });
        })
        .next()
        .within((ele1) => {
          actualSecondText = ele1.text();
          actualProductNameBeforeOpenProduct =
            actualFirstText + " " + actualSecondText;
          console.log("Debugging1 " + actualProductNameBeforeOpenProduct);
          actualProductArray = [actualProductNameBeforeOpenProduct];
        })
        .then(() => {
          console.log("Debugging2 " + actualProductNameBeforeOpenProduct);
          super
            .flipkartProductNameAfterSearch()
            .contains(productName)
            .within((ele) => {
              if ("_blank" == tabAttributeValue) {
                cy.wrap(ele)
                  .invoke("removeAttr", "target")
                  .then((afterRemove) => {
                    cy.wrap(afterRemove).click();
                  });
              } else {
                cy.wrap(ele).click();
              }
            })
            .then(() => {
              super.flipkartProductAfterOpenInnerSelector().then((ele3) => {
                cy.log(`Element After Search is: ${ele3.text()}`);
                actualProductArray.push(ele3.text());
                resolve(actualProductArray);
              });
            });
        });
    });
  }
}

export default FlipkartHomePageBusinessLayer;
