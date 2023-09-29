import { AlertHandlePage } from "../PageObjects/AlertHandlePage";

class AlertHandleBusinessLogicPage extends AlertHandlePage {
  clickOnNormalAlertButton() {
    super.normalAlertButton().should("be.visible").click();
  }
  normalAlertMsgVerifyAndPressOk(expectedMsg) {
    cy.on("window:alert", (eve) => {
      // cy.log("Alert Msg is: "+eve);
      expect(eve).to.contain(expectedMsg);
    });
  }

  confirmAlertCancellation() {
    cy.on("window:confirm", (eve) => {
      return false;
    });
  }

  clickonSideNavTab() {
    super.confirmationAlertTab().should("be.visible").click();
  }

  clickOnConfirmationAlertButton() {
    super.confirmationAlertButton().should("be.visible").click();
  }

  alertButtonPressMessageVerification(msg) {
    super.alertButtonPressMessage().should("have.text", msg);
  }

  clickOnConfirmationAlertTab() {
    super.confirmationAlertTab().should("be.visible").click();
  }

  confirmAlertMsgVerifyAndPressOk() {
    cy.on("window:confirm", (eve) => {
      return true;
    });
  }

  promptAlertMsgVerifyAndPressOk() {
    cy.window().then((win) => {
      cy.stub(win, "prompt").callsFake((message, defaultValue) => {
        return defaultValue; // Provide your desired text
      });
    });
  }

  clickOnPromptAlertTab() {
    super.promptAlertTab().should("be.visible").click();
  }

  clickOnPromptAlertButton() {
    super.promptAlertButton().should("be.visible").click();
  }

  promptAlertMessageVerification(msg) {
    super.promptAlertMessage().should("have.text", msg);
  }
}

export default AlertHandleBusinessLogicPage;
