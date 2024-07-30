import Login from "../pageElements/Login";
import HomePage from "../pageElements/HomePage";
import Global from "../pageElements/Global";

Cypress.Commands.add("getByTestId", (id) => {
  cy.get(`[data-testid=${id}]`);
});

Cypress.Commands.add("findByTestId", (id) => {
  cy.find(`[data-testid=${id}]`);
});

Cypress.Commands.add("homepageValidation", () => {
  HomePage.elements.storeExclenece().should("be.visible");
  HomePage.elements.prodList().should("have.length", 4);
  HomePage.elements.storeExclenece().should("have.text", "Store of Excellence");
});

Cypress.Commands.add("login", (email, password) => {
  cy.session([email, password], () => {
    cy.visit("/");
    cy.contains("h1", "Welcome back");
    Login.fillEmail(email);
    Login.fillPassword(password);
    Login.elements.signInButton().click();
    HomePage.elements.storeExclenece().should("be.visible");
  });
});

Cypress.Commands.add("cartPageValidation", (title) => {
  cy.title().should("eq", title);
});

Cypress.Commands.add("cartItemValidation", () => {
  cy.getByTestId("product-row")
    .contains("p", "Medusa T-Shirt")
    .should("have.text", "Medusa T-Shirt");
  cy.getByTestId("product-row").should("have.length", 1); // should be one item in cart
});
