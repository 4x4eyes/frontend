describe("root page", () => {
  beforeEach(() => {
    cy.session("login", () => {
      cy.visit("http://localhost:3000/");
      cy.contains("h1", "Binder").should("be.visible");
      cy.contains("button", "Log In").click();

      cy.origin("https://dev-rba1pzy2o2f8we1a.us.auth0.com/", () => {
        cy.get("input#username").type(Cypress.env("auth0_username"), {
          log: false,
        });
        cy.get("input#password").type(Cypress.env("auth0_password"), {
          log: false,
        });
        cy.contains("button", "Continue").click();
        cy.location("pathname").should("equal", null);
      });
    });
  });

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