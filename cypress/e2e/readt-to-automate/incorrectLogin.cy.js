describe('Log in with unregistered credentials.', () => {
    // Unregistered email
    const UNREGISERED_EMAIL = 'jass000@gmail.com'
    const PASSWORD = Cypress.env("password");

    it('Log ion with incorrect email and correct password', () => {
       cy.login(UNREGISERED_EMAIL, PASSWORD)
    })
  })