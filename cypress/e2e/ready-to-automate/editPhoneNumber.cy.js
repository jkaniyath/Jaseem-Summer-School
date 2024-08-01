
import Global from "../../pageElements/Global";

// Jira link (https://tdlschool.atlassian.net/browse/TSS22N-200)
describe('Test case for dashboard phone edit button', () => {
    const EMAIL = Cypress.env("username");
    const PASSWORD = Cypress.env("password");
    it('Apply precoditions and edit phone number', () => {
    // Login as registered user.
    cy.loginWithoutSession(EMAIL, PASSWORD);
    // wait untill dashbord button is visible
    Global.elements.dashboardLink().should('be.visible')
    Global.elements.dashboardLink().click()

    // validate we are in dashboard page.
    cy.title().should('eq', 'Dashboard')

    // Find and click on "Profile" present in side bar of Dashboard
    Global.elements.dashboardItems().contains('a', 'Profile').click()
    // validate "Profile section" is open or not
    Global.elements.profilePageWrapper().should('be.visible')
    
    // Update phone number
    Global.updatePhoneNumber('12345') // TODO: is this really Global function? looks like only used in Profile page
   

    });


  });