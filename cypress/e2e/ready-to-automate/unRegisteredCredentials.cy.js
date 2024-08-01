import Login from "../../pageElements/Login";

// Jira link (https://tdlschool.atlassian.net/browse/TSS22N-19)
describe('Sign in with not registered credentials', () => {
    const UNREGISTEREDEMAIL = 'mark.john@gmail.com'
    const UNREGISTEREDPASSWORD = 'abc135234'
    it('Signin with unregisterd email and unregistered password', () => {
        // Log in with unregisterd email and password
        cy.loginWithoutSession(UNREGISTEREDEMAIL, UNREGISTEREDPASSWORD);

        // validate we are in signin page
        cy.title().should('eq', 'Sign in')
        Login.elements.loginPage().contains('div', 'Welcome back')
        // Validate we have error message
        Login.elements.errorMessage().contains('span', 'Error: Wrong email or password.')

    });
  });
  