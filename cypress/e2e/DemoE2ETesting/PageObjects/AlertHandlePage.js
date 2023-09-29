export class AlertHandlePage {
  normalAlertButton() {
    return cy.get("div#OKTab>button");
  }

  confirmationAlertTab() {
    return cy.get(`[href="#CancelTab"]`);
  }

  confirmationAlertButton() {
    return cy.get(`div#CancelTab button`);
  }

  promptAlertTab() {
    return cy.get(`[href = "#Textbox"]`);
  }

  promptAlertButton() {
    return cy.get(`div#Textbox button`);
  }

  promptAlertMessage() {
    return cy.get(`p#demo1`);
  }

  alertButtonPressMessage() {
    return cy.get(`#demo`);
  }
}
