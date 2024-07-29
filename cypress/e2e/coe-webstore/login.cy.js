import Login from "../../pageElements/Login";
import HomePage from "../../pageElements/HomePage";
import Global from "../../pageElements/Global";

/// <reference types="Cypress" />

describe("Login functionality", () => {
  beforeEach(() => {
    //cy.visit("/");
  });

  //   it("Validate signin page", () => {
  //     cy.contains("h1", "Welcome back");
  //     Login.elements.emailInput().should("be.visible");
  //   });

  it("Logs into webstore", () => {
    cy.login(Cypress.env("username"), Cypress.env("password"));
    HomePage.elements.prodList().should("have.length", 4);
    HomePage.elements
      .storeExclenece()
      .should("have.text", "Store of Excellence");
    Global.navigateSideBar.openPage("Store");
  });
});
