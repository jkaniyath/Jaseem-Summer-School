class CheckOut {
  elements = {
    addressField: (fieldName) => cy.getByTestId(fieldName),
    checkOutButtons: (element) => cy.getByTestId(element),
  };

  fillAddressField(fieldName, fieldContent, isDropDownBox = false) {
    if (isDropDownBox) {
      this.elements.addressField(fieldName).select(fieldContent);
    } else {
      this.elements.addressField(fieldName).clear().type(fieldContent);
    }
  }

  proceedAndValidateCheckoutButtons(element) {
    // After successfully selecting the checkout element, the next step button should be enabled.
    this.elements.checkOutButtons(element).should("not.be.disabled");

    // Press button to proceed to next checkout step.
    this.elements.checkOutButtons(element).click();
  }
}

export default new CheckOut();
