import './App.css';
import { useState, useEffect } from 'react';
import MoviesContainer from '../MoviesContainer/MoviesContainer';
import MovieDetails from '../MovieDetails/MovieDetails';
import homeIcon from '../icons/home.png';

function App() {
  const [movies, setMovies] = useState([]);
  const [chosenMovie, setChosenMovie] = useState(null);

  useEffect( () => {
    getMovies()
  }, [])

  function getMovies() {
    fetch('https://rancid-tomatillos-api.onrender.com/api/v1/movies')
      .then(response => response.json())
      .then(data => {
        setMovies(data)
      })
      .catch(error => console.log(error))
  }
  
  function selectMovie(movieId) {
    fetch(`https://rancid-tomatillos-api.onrender.com/api/v1/movies/${movieId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error (`No movie found with an ID of ${movieId}`)
        }
        return response.json()
      })
      .then((data) => {
        setChosenMovie(data)
      })
      .catch((error) => console.log(error.message))
  }

  function goBack() {
    setChosenMovie(null);
  }

  function upVote(movieId) {
    fetch(`https://rancid-tomatillos-api.onrender.com/api/v1/movies/${movieId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vote_direction: 'up' }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to upvote. No movie found with an ID of ${movieId}.`);
        }
        return response.json();
      })
      .then((updatedMovie) => {
        setMovies((prevMovies) =>
          prevMovies.map((movie) =>
            movie.id === updatedMovie.id ? { ...movie, vote_count: updatedMovie.vote_count } : movie
          )
        );
      })
      .catch((error) => console.error(error.message));
  }

  function downVote(movieId) {
    fetch(`https://rancid-tomatillos-api.onrender.com/api/v1/movies/${movieId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vote_direction: 'down' }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to downvote. No movie found with an ID of ${movieId}.`);
        }
        return response.json();
      })
      .then((updatedMovie) => {
        setMovies((prevMovies) =>
          prevMovies.map((movie) =>
            movie.id === updatedMovie.id ? { ...movie, vote_count: updatedMovie.vote_count } : movie
          )
        );
      })
      .catch((error) => console.error(error.message));
  }

  return (
    <main className="App">
      <header>
        <h1>rancid tomatillos</h1>
        {chosenMovie && (
          <button className="home-button" onClick={goBack}>
            <img src={homeIcon} alt="Home" />
          </button>
        )}
      </header>
      {chosenMovie ? (
        <MovieDetails details={chosenMovie} goBack={goBack} />
      ) : (
        <MoviesContainer
          movies={movies}
          onUpVote={upVote}
          onDownVote={downVote}
          onSelectMovie={selectMovie}
        />
      )}
    </main>
  );
}

export default App;
