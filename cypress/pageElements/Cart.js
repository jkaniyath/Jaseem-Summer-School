class Cart {
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
    discountButton: () => cy.getByTestId("add-discount-button"),
    discountInput: () => cy.getByTestId("discount-input"),
    discountApplyButton: () => cy.getByTestId("discount-apply-button"),
    discountRow: () => cy.getByTestId("discount-row"),
    discountAmount: () => cy.getByTestId("discount-amount"),
    removeDiscountButton: () => cy.getByTestId("remove-discount-button"),
    totalAmount: () => cy.getByTestId("cart-total"),
  };

  deleteItemsFromCart() {
    this.elements.cartContainer().then(($body) => {
      if ($body.find('[data-testid="product-row"]').length > 0) {
        cy.getByTestId("product-row").each(($el, index, $list) => { // TODO: we only use $el parameter, do we really need 'index' & '$list' here?
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

    this.elements.optionButton().each(($el, index, $list) => { // TODO: we only use $el parameter here, do we really need 'index' & '$list'?
      const buttonText = $el.text();
      if (
        buttonText.toLowerCase().trim() === "white" ||
        buttonText.toLowerCase().trim() === "white"
      ) {
        this.elements.optionButton().contains("button", color).click();
      }
    });

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

  applyAndValidateDiscount(discountCode) {
    let amountBeforeDiscount = 0;
    let amountAfterDiscount = 0;
    const discountPercentage = 0.1;

    // If a discount is already applied, remove it
    this.elements.cartContainer().then(($body) => {
      if ($body.find('[data-testid="discount-row"]').length > 0) {
        this.elements.removeDiscountButton().click();
      }
    });

    // Click discount button and clear any existing coupon
    this.elements.discountButton().click();
    // Get total amount before discount and proceed with discount application
    this.elements
      .totalAmount()
      .invoke("text")
      .then((text) => {
        // Convert the amount text to a number
        amountBeforeDiscount = parseFloat(text.replace(/[^0-9.]/g, ""));

        // Calculate the expected discounted amount
        const discountValue = (
          amountBeforeDiscount * discountPercentage
        ).toFixed(2);
        const discountedAmount = (amountBeforeDiscount - discountValue).toFixed(
          2,
        );

        // Apply the discount code
        this.elements.discountInput().type(discountCode, { force: true });
        this.elements.discountApplyButton().click();

        // Verify that the discount row shows the expected discount
        this.elements.discountRow().contains("span", "10").should("be.visible");

        // Verify the total amount after the discount
        this.elements.totalAmount().should("have.text", `$${discountedAmount}`);
      });
  }
}

export default new Cart();
