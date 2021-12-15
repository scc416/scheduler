describe("Appointment", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");

    cy.visit("/");

    cy.contains("Monday");
  });

  it("should book an interview", () => {
    cy.get("[alt=Add]").first().click();
    cy.get("[data-testid=input]").type("Lydia Miller-Jones");
    cy.get(`[alt="Sylvia Palmer"]`).click();
    cy.contains("Save").click();
    cy.contains(
      ".appointment__card--show",
      "Lydia Miller-Jones",
      "Sylvia Palmer"
    );
  });

  it("should edit an interview", () => {
    cy.get("[alt=Edit]").click({ force: true });
    cy.get("[data-testid=input]").clear().type("Lydia Miller-Jones");
    cy.get(`[alt="Tori Malcolm"]`).click();
    cy.contains("Save").click();
    cy.contains(
      ".appointment__card--show",
      "Lydia Miller-Jones",
      "Tori Malcolm"
    );
  });
});
