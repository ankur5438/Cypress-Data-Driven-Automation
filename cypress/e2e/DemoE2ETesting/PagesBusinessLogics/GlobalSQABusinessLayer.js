import { GlobalSQAPage } from "../PageObjects/GlobalSQAPage";

class GlobalSQABusinessLayer extends GlobalSQAPage {
  dragnDropInFrame(imageNames) {
    cy.IframeLoad(super.frameElement()).then((frame) => {
      cy.log("Images are: " + imageNames);

      for (const image of imageNames) {
        let sourceElement = cy
          .wrap(frame)
          .find(super.imagesInFrameSelector())
          .contains(image);

        let targetElement = cy
          .wrap(frame)
          .find(super.trashItemsInFrameSelector());

        // Trigger the drag-and-drop action in Iframe
        sourceElement
          .trigger("mousedown", { which: 1 }) // Trigger mousedown with Left Mouse Button

          .get(super.frameElement())
          .then(() => {
            targetElement
              .trigger("mousemove") // Simulate moving to the target
              .trigger("mouseup", { force: true }); // Trigger mouseup to drop
          })
          .then(() => {
            // Adding assertions to verify Dropping of Element
            cy.wrap(frame)
              .find(super.trashItemsInFrameSelector())
              .should("contain.text", image);
          });
      }
    });
  }

  recyclingOfImagesInIFrame(imageNames) {
    cy.IframeLoad(super.frameElement()).within(() => {
      for (const image of imageNames) {
        super
          .trashItemsRecycleButtonInFrame(image)
          .click()
          .then(() => {
            cy.get(super.trashItemsInFrameSelector()).should(
              "not.contain.text",
              image
            );

            cy.get(super.imagesInFrameSelector()).should("contain.text", image);
          });
      }
    });
  }
}

export default GlobalSQABusinessLayer;
