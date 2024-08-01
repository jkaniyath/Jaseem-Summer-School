import Login from "../pageElements/Login";
import HomePage from "../pageElements/Home";

Cypress.Commands.add("getByTestId", (id) => {
  cy.get(`[data-testid=${id}]`);
});

Cypress.Commands.add("homepageValidation", () => {
  HomePage.elements.storeExcellence().should("be.visible");
  HomePage.elements.prodList().should("have.length", 4);
  HomePage.elements
    .storeExcellence()
    .should("have.text", "Store of Excellence");
});

Cypress.Commands.add("login", (email, password) => {
  cy.session([email, password], () => {
    cy.visit("/");
    cy.contains("h1", "Welcome back");
    Login.fillEmail(email);
    Login.fillPassword(password);
    Login.elements.signInButton().click();
    HomePage.elements.storeExcellence().should("be.visible");
  });
});

Cypress.Commands.add("loginWithoutSession", (email, password) => {
  cy.visit("/");
  cy.contains("h1", "Welcome back");
  Login.fillEmail(email);
  Login.fillPassword(password);
  Login.elements.signInButton().click();
});

Cypress.Commands.add("cartItemValidation", (productName) => {
  cy.getByTestId("product-row").contains("p", productName);
  cy.getByTestId("product-row").should("have.length", 1); // should be one item in cart
});
