import { expect } from "chai";
import GlobalSQABusinessLayer from "../PagesBusinessLogics/GlobalSQABusinessLayer";

describe("Drag n Drop Suit", () => {
  let globalSQAData;
  before(() => {
    cy.fixture("GlobalSQA.json").then((data) => {
      globalSQAData = data;
    });
  });
  beforeEach(() => {
    cy.visit(Cypress.env("globalSQA"));
  });

  const GlobalActions = new GlobalSQABusinessLayer();

  it("Drag N Drop In IFrame", () => {
    let imagesArray = globalSQAData.imagesToDragNDropInFrame.split("<break>");
    GlobalActions.dragnDropInFrame(imagesArray);
  });

  it("Drag N Drop to Trash and Recycling In IFrame", () => {
    let imagesArray = globalSQAData.imagesToDragNDropInFrame.split("<break>");
    let imagesArrayToRecycle =
      globalSQAData.imagesToRecycleInFrame.split("<break>");
    GlobalActions.dragnDropInFrame(imagesArray);
    GlobalActions.recyclingOfImagesInIFrame(imagesArrayToRecycle);
  });
});
