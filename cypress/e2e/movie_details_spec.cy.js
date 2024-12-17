describe('template spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('displays the application and intercepts the API calls', () => {
    cy.intercept('GET', 'https://rancid-tomatillos-api.onrender.com/api/v1/movies', {
      statusCode: 200,
      fixture: 'movie_posters'
    })

    cy.intercept('GET', 'https://rancid-tomatillos-api.onrender.com/api/v1/movies/155', {
      statusCode: 200,
      fixture: 'movies/155'
    })

    cy.get('.MoviePoster').should('have.length', 4)
    cy.get('.MoviePoster').first().click()
    cy.get('h1').should('contain', 'rancid tomatillos')
    cy.get('.home-button').should('exist').within(() => {
      cy.get('img').should('exist')
    })

    cy.get('img').should('exist')
    cy.get('.MovieDetails').should('exist').within(() => {
      cy.get('h2').should('contain', 'The Dark Knight')
      cy.get('ul').should('exist').within(() => {
        cy.get('li').first().should('contain', 'Drama')
        cy.get('li').last().should('contain', 'Thriller')
      })
      cy.get('p').should('exist')
    })

    cy.get('.home-button').click()
    cy.url().should('include', '/')
  })
})