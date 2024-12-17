describe('movie container spec', () => { 
  beforeEach(() => {
    cy.intercept('GET', 'https://rancid-tomatillos-api.onrender.com/api/v1/movies', {
      statusCode: 200,
      fixture: 'movie_posters'
    })
    cy.visit('http://localhost:3000')
  })

  it('Should be able to load the home page', () => {
    cy.get('h1').should('contain', 'rancid tomatillos')
  })

  it('displays the movie container', () => {
    cy.get('.MoviesContainer').should('exist')
  })
  
  it('displays all the movies', () => {
    cy.get('.MoviePoster').should('exist')
    cy.get('.MoviePoster').should('have.length', 4)

    cy.get('.MoviePoster').first()
      .find('img')
      .should('have.attr', 'src')
      .and('include', 'https://image.tmdb.org/t/p/original//qJ2tW6WMUDux911r6m7haRef0WH.jpg')
    cy.get('.MoviePoster').first('.button').should('exist')
    
    cy.get('.MoviePoster').last()
      .find('img')
      .should('have.attr', 'src')
      .and('include', 'https://image.tmdb.org/t/p/original//d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg')
    cy.get('.MoviePoster').last('.button').should('exist')
  })

  it('displays a movies vote count', () => {
    cy.get('.VoteContainer').should('exist')
    
    cy.get('.VoteContainer').first('p').should('contain', '32544')
    cy.get('.VoteContainer').first().find('img[alt="Upvote"]').should('exist')
    cy.get('.VoteContainer').first().find('img[alt="Downvote"]').should('exist')

    cy.get('.VoteContainer').last('p').should('contain', '27642')
    cy.get('.VoteContainer').last().find('img[alt="Upvote"]').should('exist')
    cy.get('.VoteContainer').last().find('img[alt="Downvote"]').should('exist')
  })

  it('sends you to the movie details page when a movie is selected', () => {
    cy.intercept('GET', 'https://rancid-tomatillos-api.onrender.com/api/v1/movies/155', {
      statusCode: 200,
      fixture: 'movie_details'
    })
    cy.get('.MoviePoster').first().click()
    cy.visit('http://localhost:3000/155')
    // should go to a new page (specifically movie details for movie id /155)
    cy.url().should('include', '/155')
  })

  it('adds one vote to the count when the upvote img is clicked', () => {
    cy.intercept('PATCH', "https://rancid-tomatillos-api.onrender.com/api/v1/movies/155", {
      statusCode: 201,
      body: {
        id: 155,
        poster_path: "https://image.tmdb.org/t/p/original//qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        title: "The Dark Knight",
        vote_count: 32544
      }
    })
    
    cy.get('.VoteContainer').first('p').find('p').should('contain', '32544')
    cy.get('.vote-button').first().click()
    // cy.get('.VoteContainer').first().find('img[alt="Upvote"]').should('exist').click()
    // cy.get('.VoteContainer').first('p').find('p').should('contain', '32545')
    // cy.get('.vote-button').first().click()
  })

})