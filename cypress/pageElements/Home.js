class HomePage {
  elements = {
    prodList: () => cy.getByTestId("product-wrapper"),
    storeExcellence: () => cy.getByTestId("nav-store-link"), // TODO: update naming, otherwise hard to tell what kind of element. perhaps title?
  };
}

export default new HomePage();
