class Global {
  elements = {
    sideBarBurger: () => cy.getByTestId("nav-menu-button"),

    sideBarLinks: (pageName) =>
      cy.getByTestId("nav-menu-popup").contains("a", pageName),

    //dashBoardButton : () => cy.getByTestId('nav-dashboard-link')
  };

  navigateSideBar = {
    openPage: (pagename) => {
      this.elements.sideBarBurger().click();
      this.elements.sideBarLinks(pagename).click();
    },
  };
}

export default new Global();
