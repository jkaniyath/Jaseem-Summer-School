class Global {
  elements = {
    sideBarBurger: () => cy.getByTestId("nav-menu-button"),
    storeOfExclenece: () => cy.getByTestId("nav-store-link"),
    dashboardLink : () => cy.getByTestId("nav-dashboard-link"),
    profileLink : () => cy.getByTestId("profile-link"),
    overviewLink : () => cy.getByTestId("overview-link"),
    dashboardItems : () => cy.getByTestId("account-nav"),
    phoneEditor : () => cy.getByTestId("account-phone-editor"),
    phoneInput : () => cy.getByTestId("phone-input"),
    saveButton : () => cy.getByTestId("save-button"),
    successmessage : () => cy.getByTestId("success-message"),
    profilePageWrapper : () => cy.getByTestId("profile-page-wrapper"),
    sideBarLinks: (pageName) =>
      cy.getByTestId("nav-menu-popup").contains("a", pageName),
  };

  navigateSideBar = {
    openPage: (pagename) => {
      this.elements.sideBarBurger().click();
      this.elements.sideBarLinks(pagename).click();
    },
  };

  updatePhoneNumber(phoneNumber) {
    // To find phone editor button and click
    this.elements.phoneEditor().find('[data-testid="edit-button"]').click()
    // validate phone number input field is visible
    this.elements.phoneInput().should('be.visible')
    // type phone number into field
    this.elements.phoneInput().clear().type(phoneNumber)
    // save enetered phone numer
    this.elements.saveButton().filter(':visible').click();
    // If it is saved successfully, a message will be displayed.
    this.elements.successmessage().contains('span', 'Phone updated successfully!')
  }
}

export default new Global();
