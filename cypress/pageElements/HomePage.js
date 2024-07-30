class HomePage {
  elements = {
    prodList: () => cy.getByTestId("product-wrapper"),
    storeExclenece: () => cy.getByTestId("nav-store-link"),
  };
}

export default new HomePage();
