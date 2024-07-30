import Login from "../../pageElements/Login";
import HomePage from "../../pageElements/HomePage";
import Global from "../../pageElements/Global";
import Checkout from "../../pageElements/Checkout";
import AddToCart from "../../pageElements/AddToCart";

// <reference types="Cypress" />

describe("Login functionality", () => {
  const EMAIL = Cypress.env("username");
  const PASSWORD = Cypress.env("password");

  beforeEach(() => {
    cy.login(EMAIL, PASSWORD);
  });

  it("Logs into webstore", () => {
    cy.visit("/");
    cy.homepageValidation();
  });

  it("Add an item to cart ", () => {
    // navigate to cart page and delete items if already present
    cy.visit("/cart");

    // To validate "Cart" page is open.
    cy.title().should("eq", "Cart");
    // Delete items in cart if alreday present.
    AddToCart.deleteItemsFromCart();

    // Validate items are deleted from cart
    AddToCart.isItemDeleted();

    //Go back to home page.
    Global.navigateSideBar.openPage("Home");
    // To validate whether we are returned to homepage or not.
    cy.homepageValidation();

    // Add Medusa T-Shirt to cart
    cy.getByTestId("product-wrapper").contains("p", "Medusa T-Shirt").click();
    // Validate we are in cart page
    cy.cartPageValidation("Medusa T-Shirt | Store of Excellence");

    // Choose size 'L'
    cy.getByTestId("product-options").contains("button", "L").click();
    cy.getByTestId("option-button").contains("button", "White").click();

    //validate "Addto cart button is enabled"
    cy.getByTestId("add-product-button").should("not.be.disabled");

    cy.getByTestId("add-product-button").click();

    //Validate cart item.
    cy.getByTestId("nav-cart-link").click(); // Go to cart page
    cy.cartItemValidation();
    cy.getByTestId("product-select-button").invoke("val").should("equal", "1"); // Number of T shirt should be one.
  });

  it("Check out item from cart", () => {
    //Go to Cart page
    cy.visit("/cart");

    // Validate Cart page
    cy.cartPageValidation("Cart");
    // Press checkout button
    cy.getByTestId("checkout-button").click();

    // Validate checkout page
    cy.title().should("eq", "Checkout");
    cy.getByTestId("checkout-container")
      .contains("h2", "Shipping Address")
      .should("have.text", "Shipping Address");
    cy.cartItemValidation();

    // Fill address details

    // If adreess details are already present we need to press "edit" button to open adress fields.
    cy.getByTestId("checkout-container").then(($body) => {
      if ($body.find('[data-testid="edit-address-button"]').length > 0) {
        cy.getByTestId("edit-address-button").click();
      }
    });

    //cy.getByTestId('shipping-first-name-input').type('jass')
    Checkout.fillAddressField("shipping-first-name-input", "jass");
    Checkout.fillAddressField("shipping-last-name-input", "Kaniyath");
    Checkout.fillAddressField("shipping-address-input", "ABC street 101");
    Checkout.fillAddressField("shipping-postal-code-input", "333");
    Checkout.fillAddressField("shipping-city-input", "New York");
    Checkout.fillAddressField("shipping-country-select", "United States", true);

    // After fill adress details press "Continue to delivery" button.
    cy.getByTestId("submit-address-button").click();

    // Validate adress summary is visisble
    cy.getByTestId("shipping-address-summary").should("be.visible");

    // Select "FakeEx Standard" from delivery options
    cy.getByTestId("delivery-option-radio").contains("FakeEx Standard").click();

    // After succesfully select delivery method "Continue to payment" button should be enabled then we need to proceed to payment.
    Checkout.proceedAndValidateCheckoutButtons("submit-delivery-option-button");

    // // After succesfully select delivery method "Continue to review" button should be enabled and then we need to proceed to place order.
    Checkout.proceedAndValidateCheckoutButtons("submit-payment-button");

    // After succesfully select delivery method "Place order" button should be enabled and confirm order.
    Checkout.proceedAndValidateCheckoutButtons("submit-order-button");

    // It should show successfull order message.
    cy.getByTestId("order-complete-container")
      .contains("span", "Your order was placed successfully.")
      .should("have.text", "Your order was placed successfully.");
    // validate we have correct cart item
    cy.cartItemValidation();
  });

  it("Logs out from webstore", () => {
    cy.visit("/");
    cy.homepageValidation();

    // Click side hamburger button and press "Log out" button
    Global.elements.sideBarBurger().click();
    cy.getByTestId("logout-button").click();

    // validate we are logged out
    cy.getByTestId("account-page").contains("h1", "Welcome back");
  });
});
