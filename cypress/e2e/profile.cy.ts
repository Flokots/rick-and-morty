describe('Profile Page', () => {
    beforeEach(() => {
        cy.visit('/')
          .get('[data-testid="character-name"]')
          .contains('Rick Sanchez')
          .click()
    })

    it('navigates to the correct profile page', () => {
        cy.url()
          .should('contain', '/profile/1')
    
        cy.get('[data-testid="profile-heading"]')
          .should('contain', 'Rick Sanchez')
    })

    it('back button navigates to the home page', () => {
        cy.get('[data-testid="back-button"]')
          .click()

        // For now, the back button navigates to the first page
        cy.url()
          .should('contain', '/home')
          .get('[data-testid="character-name"]')
          .contains('Rick Sanchez')

    })
})