import Login from "../../pageElements/Login";
import HomePage from "../../pageElements/HomePage";
import Global from "../../pageElements/Global";

// <reference types="Cypress" />

describe("Login functionality", () => {
    beforeEach(() => {
      //cy.visit("/");
    });
  
  
    it("Logs into webstore", () => {
      cy.login(Cypress.env("username"), Cypress.env("password"));
      HomePage.elements.prodList().should("have.length", 4);
      HomePage.elements
        .storeExclenece()
        .should("have.text", "Store of Excellence");
    });

    it("Add an item to cart functionality", () => {
        cy.login(Cypress.env("username"), Cypress.env("password"));
        // navigate to cart page and delete items if already present
        Global.navigateSideBar.openPage("Cart");
        // To validate "Cart" page is open.
        cy.title().should('eq', 'Cart');
       
        
        cy.getByTestId('cart-container').then(($body) => {
          if($body.find('[data-testid="product-row"]').length > 0){
            cy.getByTestId('product-row').each(($el, index, $list) => {
                $el.find('button').click()
            })
          }
        })
       
      });

  });