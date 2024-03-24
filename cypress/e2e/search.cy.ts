describe('Search Function', () => {
    it('Displays search results', () => {
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
})