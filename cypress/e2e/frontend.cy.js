describe('Auth0', function () {
  beforeEach(function () {
    // cy.task('db:seed')
    cy.intercept('POST', '/graphql').as('createBankAccount')
    cy.loginToAuth0(
      Cypress.env('AUTH0_USERNAME'),
      Cypress.env('AUTH0_PASSWORD')
    )
    cy.visit('localhost:3000')
  })

  it('shows onboarding', function () {
    cy.contains('Get Started').should('be.visible')
  })
})

describe("root page", () => {
  // beforeEach(() => {
  //   cy.session("user", () => {
  //     cy.visit(
  //       "//dev-rba1pzy2o2f8we1a.us.auth0.com/u/login?state=hKFo2SBFd2swMUc4VlR6ZGdrMVBUNFJKajNCQ0p2SURFb01vRaFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIHBwSnJBOE83M0d1OG5SNWJ5TGYyMElHaDV1cWw3bzMzo2NpZNkgSzc1T1NFU0JuWUVIaXNkSlhrTTZZUElGMTVhUXl3OEs"
  //     );
  //     cy.get("email").type("test12@gmail.com");
  //     cy.get("#password").type("password");
  //     cy.get(".p-button").click();
  //     cy.wait(2000);
  //   });
  // });

  it("passes find-matches", () => {
    cy.visit("localhost:3000");

    cy.contains("Find Matches").click();

    cy.url().should("include", "find-matches");
  });
  it("passes meetups", () => {
    cy.visit("localhost:3000");

    cy.contains("Meetups").click();

    cy.url().should("include", "meetups");
  });
  it("passes messages", () => {
    cy.visit("localhost:3000");

    cy.contains("Messages").click();

    cy.url().should("include", "messages");
  });
  it("passes login", () => {
    cy.visit("localhost:3000");

    cy.contains("Log In").click();
  });
});

