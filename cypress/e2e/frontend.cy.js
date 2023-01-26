
describe('login', function() {
  function loginViaAuth0Ui(username: string, password: string) {
    // App landing page redirects to Auth0.
    cy.visit('/')
  
    // Login on Auth0.
    cy.origin(
      Cypress.env('auth0_domain'),
      { args: { username, password } },
      ({ username, password }) => {
        cy.get('input#username').type(username)
        cy.get('input#password').type(password, { log: false })
        cy.contains('button[value=default]', 'Continue').click()
      }
    )
  
    // Ensure Auth0 has redirected us back to the RWA.
    cy.url().should('equal', 'http://localhost:3000/')
  }
  
  Cypress.Commands.add('loginToAuth0', (username: string, password: string) => {
    const log = Cypress.log({
      displayName: 'AUTH0 LOGIN',
      message: [`🔐 Authenticating | ${username}`],
      // @ts-ignore
      autoEnd: false,
    })
    log.snapshot('before')
  
    cy.session(
        `auth0-${username}`,
        () => {
          loginViaAuth0Ui(username, password)
        },
        {
          validate: () => {
            // Validate presence of access token in localStorage.
            cy.wrap(localStorage)
              .invoke('getItem', 'authAccessToken')
              .should('exist')
          },
        }
      )
  
    log.snapshot('after')
    log.end()
  })
})


describe('Auth0', function () {
  beforeEach(function () {
    cy.task('db:seed')
    cy.intercept('POST', '/graphql').as('createBankAccount')
    cy.loginToAuth0(
      Cypress.env('auth0_username'),
      Cypress.env('auth0_password')
    )
    cy.visit('/')
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

