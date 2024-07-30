class AddTocart {
  elements = {
    cartContainer: () => cy.getByTestId("cart-container"),
    cartItems : () => cy.getByTestId("product-row"),
    productWrapper : () => cy.getByTestId("product-wrapper"),
    productOptions : () => cy.getByTestId("product-options"),
    optionButton : () => cy.getByTestId("option-button"),
    addProductButton : () => cy.getByTestId("add-product-button")
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
 isItemDeleted(){
        this.elements.cartItems().should("not.exist");
    }

selectItemAndValidate(){
    // Select item from home page and prees button

    // Validate we enter to cart page which shows selected item.

}

}

export default new AddTocart();
