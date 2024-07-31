class Global {
  elements = {
    sideBarBurger: () => cy.getByTestId("nav-menu-button"),
    storeOfExclenece: () => cy.getByTestId("nav-store-link"),
    sideBarLinks: (pageName) =>
      cy.getByTestId("nav-menu-popup").contains("a", pageName),
  };

  navigateSideBar = {
    openPage: (pagename) => {
      this.elements.sideBarBurger().click();
      this.elements.sideBarLinks(pagename).click();
    },
  };
}

export default new Global();
