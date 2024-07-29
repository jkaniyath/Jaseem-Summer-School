import Login from "../pageElements/Login";

Cypress.Commands.add("getByTestId", (id) => {
  cy.get(`[data-testid=${id}]`);
});

Cypress.Commands.add("login", (email, password) => {
  cy.visit("/");
  cy.contains("h1", "Welcome back");
  Login.fillEmail(email);
  Login.fillPassword(password);
  Login.elements.signInButton().click();
});
