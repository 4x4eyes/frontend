// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// const mystery = require("../../cypress.config")
// console.log(mystery);

function loginViaAuth0Ui(username = "fourbyfoureyes@yahoo.com", password = "Fourx4eyesdev$") {
    // App landing page redirects to Auth0.
    cy.visit('localhost:3000')
  
    // Login on Auth0.
    console.log(Cypress.env('auth0_username'));
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
  
  Cypress.Commands.add('loginToAuth0', (username, password) => {
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
  