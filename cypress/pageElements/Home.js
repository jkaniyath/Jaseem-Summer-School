class HomePage {
  elements = {
    prodList: () => cy.getByTestId("product-wrapper"),
    storeExcellence: () => cy.getByTestId("nav-store-link"),
  };
}

export default new HomePage();
