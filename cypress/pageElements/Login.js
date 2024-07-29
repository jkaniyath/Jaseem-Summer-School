class Login {
  elements = {
    emailInput: () => cy.getByTestId("email-input"),
    passWordInput: () => cy.getByTestId("password-input"),
    signInButton: () => cy.getByTestId("sign-in-button"),
  };

  fillEmail(email) {
    this.elements.emailInput().clear().type(email);
  }

  fillPassword(password) {
    this.elements.passWordInput().clear().type(password);
  }
}

export default new Login();
