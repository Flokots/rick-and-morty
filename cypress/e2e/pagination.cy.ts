describe('Pagination', () => {
    beforeEach(() => {
        cy.visit('/')
          .scrollTo('bottom')
          .get('[data-testid="pagination"]')
    })

    it('displays current pagination(first page)', () => {
        cy.visit('/home')
          .get('[data-testid="pagination-text"]')
          .should('contain', 'Page 1 of 42')
    })

    it('navigates to next page', () => {
        cy.get('[data-testid="next-page-button"]')
          .click()
          .get('[data-testid="character-name"]')
          .should('contain', 'Aqua Morty')

    })

    it('navigates to previous page', () => {
        cy.get('[data-testid="next-page-button"]')
          .click()
          .get('[data-testid="previous-page-button"]')
          .click()
          .get('[data-testid="character-name"]')
          .should('contain', 'Rick Sanchez')

    })

    it('navigates to last page', () => {
        cy.get('[data-testid="last-page-button"]')
          .click()
          .get('[data-testid="last-page-button"]')
          .should('be.disabled')
          .get('[data-testid="next-page-button"]')
          .should('be.disabled')
          .get('[data-testid="character-name"]')
          .should('contain', 'Butter Robot')

    })

    it('navigates to first page', () => {
        cy.get('[data-testid="next-page-button"]')
          .click()
          .get('[data-testid="first-page-button"]')
          .click()
          .should('be.disabled')
          .get('[data-testid="previous-page-button"]')
          .should('be.disabled')
          .get('[data-testid="character-name"]')
          .should('contain', 'Rick Sanchez')
          
    })
})