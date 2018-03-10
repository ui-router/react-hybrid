describe('example app', () => {
  it('loads', () => {
    cy.visit('http://localhost:4000');
  });

  it('renders links', () => {
    cy.visit('http://localhost:4000/');
    cy.get('a').contains('react.angular');
    cy.get('a').contains('angular.react');
    cy.contains('a[ui-sref=angular]', 'angular')
  });

  it('renders angularjs', () => {
    cy.visit('http://localhost:4000');
    cy.contains('a[ui-sref=angular]', 'angular').click();
    cy.url().should('include', '#!/angular');
    cy.contains('Hello from angularjs');
  });

  it('renders react', () => {
    cy.visit('http://localhost:4000');
    cy.contains('a[ui-sref=react]', 'react').click();
    cy.url().should('include', '#!/react');
    cy.contains('Hello from react');
  });

  it('renders react inside angularjs', () => {
    cy.visit('http://localhost:4000');
    cy.get('a').contains('angular.react').click();
    cy.url().should('include', '#!/angular/react');
    cy.contains('Hello from angularjs');
    cy.contains('Hello from react');
  });


  it('renders angularjs inside react', () => {
    cy.visit('http://localhost:4000');
    cy.get('a').contains('react.angular').click();
    cy.url().should('include', '#!/react/angular');
    cy.contains('Hello from react');
    cy.contains('Hello from angularjs');
  });

});
