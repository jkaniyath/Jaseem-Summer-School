class CheckOut {
  elements = {
    checkOutButton: () => cy.getByTestId("checkout-button"),
    checkOutContainer: () => cy.getByTestId("checkout-container"),
    submitAddress: () => cy.getByTestId("submit-address-button"),
    editButton: () => cy.getByTestId("edit-address-button"),
    addressSummary: () => cy.getByTestId("shipping-address-summary"),
    deliveryTypeButton: () => cy.getByTestId("delivery-option-radio"),
    submitDelivery: () => cy.getByTestId("submit-delivery-option-button"),
    submitPayment: () => cy.getByTestId("submit-payment-button"),
    submitOrder: () => cy.getByTestId("submit-order-button"),
    orderCompleteContainer: () => cy.getByTestId("order-complete-container"),
    addressField: (fieldName) => cy.getByTestId(fieldName),
    checkOutButtons: (element) => cy.getByTestId(element),
  };

  gotoCheckoutAndValidate(productName) {
    // Goto checkout page.
    this.elements.checkOutButton().click();

    // Validate checkout page
    cy.title().should("eq", "Checkout");
    this.elements
      .checkOutContainer()
      .contains("h2", "Shipping Address")
      .should("have.text", "Shipping Address");
    // Validate we have correct item in checkout page.
    cy.cartItemValidation(productName);
  }

  // To get edit button if its already present and click it to type address details.
  editAddress() {
    this.elements.checkOutContainer().then(($body) => {
      if ($body.find('[data-testid="edit-address-button"]').length > 0) {
        this.elements.editButton().click();
      }
    });
  }

  submitAddressAndValidate() {
    this.elements.submitAddress().click();
    // Validate adress summary is visisble
    this.elements.addressSummary().should("be.visible");
  }

  fillAddressField(fieldName, fieldContent, isDropDownBox = false) {
    if (isDropDownBox) {
      this.elements.addressField(fieldName).select(fieldContent);
    } else {
      this.elements.addressField(fieldName).clear().type(fieldContent);
    }
  }

  selectAndValidateDelivery(deliveryType) {
    // To select delivery type and click on it.
    this.elements.deliveryTypeButton().contains("span", deliveryType).click();

    // After that "Continue to payment" button should be enabled.
    this.elements.submitDelivery().should("not.be.disabled");
  }

  validatePayment() {
    // Press "Continue to payment" button
    this.elements.submitDelivery().click();
    // After select payment button "Continue to review" button should be enabled.
    this.elements.submitPayment().should("not.be.disabled");
  }

  validateReview() {
    // Click "Review" button
    this.elements.submitPayment().click();

    // After click "Review" button "Place order" button should be enabled
    this.elements.submitOrder().should("not.be.disabled");
  }

  placeAndValidateOrder() {
    // Click "Place order" button
    this.elements.submitOrder().click();

    // It should show successfull order message.
    this.elements
      .orderCompleteContainer()
      .contains("span", "Your order was placed successfully.")
      .should("have.text", "Your order was placed successfully.");

    //Validate we have correct cart item
    cy.cartItemValidation("Medusa T-Shirt");
  }
}

export default new CheckOut();
