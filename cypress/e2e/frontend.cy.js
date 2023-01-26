describe("root page", () => {
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
