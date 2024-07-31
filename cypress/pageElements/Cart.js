class AddTocart { // maybe call it Cart
  elements = {
    cartContainer: () => cy.getByTestId("cart-container"),
    cartItems: () => cy.getByTestId("product-row"),
    productWrapper: () => cy.getByTestId("product-wrapper"),
    productOptions: () => cy.getByTestId("product-options"),
    optionButton: () => cy.getByTestId("option-button"),
    addToCartButton: () => cy.getByTestId("add-product-button"),
    productSelectButton: () => cy.getByTestId("product-select-button"),
    productTitle: () => cy.getByTestId("product-title"),
    cartButton: () => cy.getByTestId("nav-cart-link"),
  };

  deleteItemsFromCart() {
    this.elements.cartContainer().then(($body) => {
      if ($body.find('[data-testid="product-row"]').length > 0) {
        cy.getByTestId("product-row").each(($el, index, $list) => {
          $el.find("button.flex").click(); // To find delete button element in cart item
        });
      }
    });
  }
  isItemDeleted() {
    this.elements.cartItems().should("not.exist");
  }

  selectItemAndValidate(productName) {
    // Select item from home page and prees button
    this.elements.productWrapper().contains("p", productName).click();

    // Validate we enter to cart page which shows selected item.
    cy.title().should("eq", `${productName} | Store of Excellence`);
    this.elements
      .productTitle()
      .contains("h2", productName)
      .should("have.text", productName);
  }

  selectProductAttributesAndValidate(size, color) {
    // Select product attributes
    this.elements.productOptions().contains("button", size).click();
    this.elements.optionButton().contains("button", color).click();

    // Validate "Add to cart" button is enabled (It will not be enabled if product is out of stock) after choose product attributes
    this.elements.addToCartButton().should("not.be.disabled");
  }

  addToCartAndValidate(productName) {
    // click "Add to cart" button
    this.elements.addToCartButton().click();

    // validate it shows correct product details as user chose.
    this.elements.cartButton().click();
    cy.cartItemValidation(productName);
    this.elements.productSelectButton().invoke("val").should("equal", "1"); // Number of T shirt should be one.
  }
}

export default new AddTocart();
