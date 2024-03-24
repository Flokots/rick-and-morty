describe('The Home Page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Visits the home page url', () => {
    cy.visit('/home')
  })

  it('Heading contains the Rick and Morty Characters text', () => {
    cy.get('[data-testid="rick-and-morty-heading"]')
      .should('contain', 'Rick and Mortycharacters')
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
