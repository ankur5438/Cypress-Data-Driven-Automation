import { expect } from "chai";
import FlipkartHomePageBusinessLayer from "../PagesBusinessLogics/FlipkartHomePageBusinessLayer";

describe("Alert Handling Suits", () => {
  let addToCartData;
  before(() => {
    cy.fixture("FlipkartAddToCart.json").then((data) => {
      addToCartData = data;
    });
  });
  beforeEach(() => {
    cy.visit(Cypress.env("flipkartURL"));
  });

  const FlipkartActions = new FlipkartHomePageBusinessLayer();

  it("Add To Cart", () => {
    FlipkartActions.selectCatagoryAndSubCategory(
      addToCartData.category,
      addToCartData.categoryOptions,
      addToCartData.categorySubOptions
    );

    FlipkartActions.searchAndSelectBrandsFromFlterSection(
      addToCartData.brandName
    );

    return FlipkartActions.clickOnFlipkartProductAfterSearch(
      addToCartData.productName
    ).then((actualProductName) => {
      cy.log(
        "Expected Name is: " +
          (addToCartData.productName + " " + addToCartData.productFeatures)
      );

      actualProductName[1] = actualProductName[1].replace(/\s+/g, " ");
      cy.log("Actual1 Name is: " + actualProductName[0]);
      cy.log("Actual2 Name is: " + actualProductName[1]);
      cy.log(
        "Expected1 Name is: " +
          addToCartData.productName +
          " " +
          addToCartData.productFeatures
      );
      cy.log(
        "Expected2 Name is: " +
          addToCartData.productName +
          " " +
          "(" +
          addToCartData.productFeatures +
          ")"
      );

      expect(
        addToCartData.productName + " " + addToCartData.productFeatures
      ).to.equal(actualProductName[0]);

      expect(
        addToCartData.productName +
          " " +
          "(" +
          addToCartData.productFeatures +
          ")"
      ).to.equal(actualProductName[1]);
    });
  });
});
