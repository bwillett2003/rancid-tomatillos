import './App.css';
import searchIcon from '../icons/search.png';

// Example imports (for later):
import { useState, useEffect } from 'react';
import moviePosters from '../data/movie_posters';
// import movieDetails from '../data/movie_details';
import MoviesContainer from '../MoviesContainer/MoviesContainer';

function App() {
  const [movies, setMovies] = useState(moviePosters)
  
  function upVote(movieId) {
    const updatedMovies = movies.map(movie => {
      if (movie.id === movieId) {
        return { ...movie, vote_count: movie.vote_count + 1 }
      }
      return movie 
    })
    setMovies(updatedMovies)
  }
  return (
    <main className='App'>
      <header>
        <h1>rancid tomatillos</h1>
      </header>
      <MoviesContainer movies={moviePosters} onUpVote={upVote}/>
    </main>
  );
}

export default App;
