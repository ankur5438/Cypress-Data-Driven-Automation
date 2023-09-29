export class GlobalSQAPage {
  frameElement() {
    return `[rel-title="Photo Manager"] iframe.demo-frame`;
  }
  imagesInFrameSelector() {
    return `#gallery h5`;
  }

  trashItemsInFrameSelector() {
    return `div #trash`;
  }

  trashItemsRecycleButtonsInFrame() {
    return cy.get(`#trash h5 ~ a[title="Recycle this image"]`);
  }

  trashItemsRecycleButtonInFrame(imageName) {
    return cy.xpath(
      "//div[@id='trash']//h5[text()='" +
        imageName +
        "']/following-sibling::a[@title='Recycle this image']"
    );
  }
}
