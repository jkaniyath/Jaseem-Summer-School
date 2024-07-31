import Global from "./Global";

class Logout { // since there is no logout page you can move this to global
  elements = {
    logOutButton: () => cy.getByTestId("logout-button"),
    accountPage: () => cy.getByTestId("account-page"),
  };

  selectAndValidateLogout() {
    // To select side humburger button
    Global.elements.sideBarBurger().click();

    // Clock "Logout" button
    this.elements.logOutButton().click();

    // Validate user can successfully logout and go back to login page
    this.elements
      .accountPage()
      .contains("h1", "Welcome back")
      .should("have.text", "Welcome back"); // you can just use one text validation
  }
}

export default new Logout();
