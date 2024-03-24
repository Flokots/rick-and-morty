describe('The Home Page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Visits the home page url', () => {
    cy.visit('/home')
  })

  it('Heading contains the Rick and Morty Characters', () => {
    cy.get('[data-testid="rick-and-morty-heading"]')
      .should('contain', 'Rick and Mortycharacters')
  })

  it('Search function works', () => {
    cy.get('[data-testid="search-bar"]')
      .type('rick')
      .get('[data-testid="search-button"]')
      .click()
    
    cy.url().should('include', '/home?search=rick')
      .get('[data-testid="character-name"]')
      .contains('Rick Sanchez')
  })

  it('Displays error message when character is not found', () => {
    cy.get('[data-testid="search-bar"]')
      .type('abracadabra')
      .get('[data-testid="search-button"]')
      .click()

    cy.url().should('include', '/home?search=abracadabra')
      .get('[data-testid="error-text"]')
      .contains('There is nothing here!')
  })

  it('Contains Rick and Morty characters name', () => {
    cy.get('[data-testid="character-name"]')
      .should('not.be.empty')
  })

  it('Contains Rick and Morty characters species', () => {
    cy.get('[data-testid="character-species"]')
      .should('not.be.empty')
  })

  it('Contains Rick and Morty characters status', () => {
    cy.get('[data-testid="character-status"]')
      .should('not.be.empty')
  })
})
