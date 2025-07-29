describe("Unit testing (Login)", () => {
  it("tests Unit testing (Login)", () => {
    cy.viewport(1076, 791);
    cy.visit("http://localhost:5173/");
    cy.get("a:nth-of-type(6) > button").click();
    cy.get("#email").click();
    cy.get("#email").type("Admin@gmail.com");
    cy.get("#password").click();
    cy.get("#password").type("A");
    cy.get("#password").type("Admin123");
    cy.get("#root > div > div button").click();
  });
});
//# recorderSourceMap=BCBDBEBFBGBHBIAIAIBJAJAJBKB