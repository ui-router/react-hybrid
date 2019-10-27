describe('example app', () => {
  it('loads', () => {
    cy.visit('');
  });

  it('renders links', () => {
    cy.visit('/');
    cy.get('a').contains('react.angular');
    cy.get('a').contains('angular.react');
    cy.contains('a[ui-sref=angular]', 'angular');
  });

  it('renders angularjs', () => {
    cy.visit('');
    cy.get('#angular').click();
    cy.url().should('include', '#!/angular');
    cy.contains('Hello from angularjs');
  });

  it('renders react', () => {
    cy.visit('');
    cy.get('#react').click();
    cy.url().should('include', '#!/react');
    cy.contains('Hello from react class component');
  });

  it('renders react inside angularjs', () => {
    cy.visit('');
    cy.get('#angular_react').click();
    cy.url().should('include', '#!/angular/react');
    cy.contains('Hello from angularjs');
    cy.contains('Hello from react class component');
  });

  it('renders angularjs inside react', () => {
    cy.visit('');
    cy.get('#react_angular').click();
    cy.url().should('include', '#!/react/angular');
    cy.contains('Hello from react class component');
    cy.contains('Hello from angularjs');
  });

  it('renders angularjs inside react inside angularjs', () => {
    cy.visit('');
    cy.get('#angular_react_angular').click();
    cy.url().should('include', '#!/angular/react/angular');
    cy.contains('Hello from angularjs');
    cy.contains('Hello from react class component');
    cy.contains('Hello from second angularjs');
  });

  it('renders react inside angularjs inside react', () => {
    cy.visit('');
    cy.get('#react_angular_react').click();
    cy.url().should('include', '#!/react/angular/react');
    cy.contains('Hello from react class component');
    cy.contains('Hello from angularjs');
    cy.contains('Hello from react functional component');
  });

  it('renders react inside angularjs inside react inside angularjs', () => {
    cy.visit('');
    cy.get('#angular_react_angular_react').click();
    cy.url().should('include', '#!/angular/react/angular/react');
    cy.contains('Hello from angularjs');
    cy.contains('Hello from react class component');
    cy.contains('Hello from second angularjs');
    cy.contains('Hello from react functional component');
  });

  it('renders angularjs inside react inside angularjs inside react', () => {
    cy.visit('');
    cy.get('#react_angular_react_angular').click();
    cy.url().should('include', '#!/react/angular/react/angular');
    cy.contains('Hello from react class component');
    cy.contains('Hello from angularjs');
    cy.contains('Hello from react functional component');
    cy.contains('Hello from second angularjs');
  });

  it('renders angularjs components via componentProvider', () => {
    cy.visit('');

    cy.get('#componentProviderAngular1').click();
    cy.url().should('include', '#!/componentProvider/angularComponent');
    cy.contains('Hello from angularjs');

    cy.get('#componentProviderAngular2').click();
    cy.url().should('include', '#!/componentProvider/angularComponent2');
    cy.contains('Hello from second angularjs component');
  });

  it('renders artibrary react or angular components via componentProvider', () => {
    cy.visit('');

    cy.get('#componentProviderAngular1').click();
    cy.url().should('include', '#!/componentProvider/angularComponent');
    cy.contains('Hello from angularjs');

    cy.get('#componentProviderReact1').click();
    cy.url().should('include', '#!/componentProvider/ReactComponent');
    cy.contains('Hello from react class component');

    cy.get('#componentProviderAngular2').click();
    cy.url().should('include', '#!/componentProvider/angularComponent2');
    cy.contains('Hello from second angularjs component');

    cy.get('#componentProviderReact2').click();
    cy.url().should('include', '#!/componentProvider/ReactFunctionalComponent');
    cy.contains('Hello from react functional component');
  });
});
