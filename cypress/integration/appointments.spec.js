describe("Appointment", () => {
  it("should book an interview", () => {
    cy.request('get', '/api/debug/reset');
    cy.visit("/");
    cy.contains("Monday");
    cy.get("[alt=Add]").first().click();
    cy.get("[data-testid=input]").type("Lydia Miller-Jones");
    cy.get(`[alt="Sylvia Palmer"]`).click();
    cy.contains("Save").click();
    cy.contains(".appointment__card--show", "Lydia Miller-Jones", "Sylvia Palmer");
  });
});
