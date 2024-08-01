import Cart from "../../pageElements/Cart";
import Global from "../../pageElements/Global";

describe("Apply discount code", function () {
  const EMAIL = Cypress.env("username");
  const PASSWORD = Cypress.env("password");

  it("Actions to apply discount", function () {
    // Login as registered user.
    cy.loginWithoutSession(EMAIL, PASSWORD);

    //Go to cart and delete items if already present
    Global.navigateSideBar.openPage("Cart");

    // To validate "Cart" page is open.
    cy.title().should("eq", "Cart");

    // Delete items in cart if alreday present.
    Cart.deleteItemsFromCart();

    // Validate items are deleted from cart
    Cart.isItemDeleted();

    //Go back to home page.
    Global.navigateSideBar.openPage("Home");

    // To validate whether we are returned to homepage or not.
    cy.homepageValidation();

    // To select a product from the homepage and validate that the user chose the correct product.
    Cart.selectItemAndValidate("Medusa Hoodie");

    // Choose size 'L' and color 'White'
    Cart.selectProductAttributesAndValidate("XL", "White");

    // To add item to cart and validate.
    Cart.addToCartAndValidate("Medusa Hoodie");

    // Goto 'Cart' page
    Global.navigateSideBar.openPage("Cart");

    // To validate "Cart" page is open.
    cy.title().should("eq", "Cart");

    Cart.applyAndValidateDiscount("SUMMERSCHOOL");
  });
});
