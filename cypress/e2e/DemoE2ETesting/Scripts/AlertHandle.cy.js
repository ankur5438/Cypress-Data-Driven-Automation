//const { logger } = require("../../../logger");
import AlertHandleBusinessLogicPage from "../PagesBusinessLogics/AlertHandleBusinessLogicPage";

describe("Alert Handling Suits", () => {
  let alertData;
  before(() => {
    cy.fixture("alertWindowData.json").then((data) => {
      alertData = data;
    });
  });

  beforeEach(() => {
    cy.visit(Cypress.env("alertURL"), { timeout: 10000 });
  });

  const AlertActions = new AlertHandleBusinessLogicPage();

  it("Normal Alert Accept", () => {
    AlertActions.clickOnNormalAlertButton();
    AlertActions.normalAlertMsgVerifyAndPressOk(alertData.normalAlertMessage);
  });

  it("Confirmation Alert Cancel", () => {
    AlertActions.clickOnConfirmationAlertTab();
    AlertActions.clickOnConfirmationAlertButton();
    AlertActions.confirmAlertCancellation();
    AlertActions.alertButtonPressMessageVerification(
      alertData.confirmationAlertCancelMsg
    );
  });

  it("Confirmation Alert OK", () => {
    AlertActions.clickOnConfirmationAlertTab();
    AlertActions.clickOnConfirmationAlertButton();
    AlertActions.confirmAlertMsgVerifyAndPressOk();
    AlertActions.alertButtonPressMessageVerification(
      alertData.confirmationAlertOkayMsg
    );
  });

  it("Prompt Alert OK", () => {
    AlertActions.promptAlertMsgVerifyAndPressOk();
    AlertActions.clickOnPromptAlertTab();
    AlertActions.clickOnPromptAlertButton();
    AlertActions.promptAlertMessageVerification(alertData.promptAlertMessage);
  });
});
