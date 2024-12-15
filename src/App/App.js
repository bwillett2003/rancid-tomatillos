import './App.css';
import { useState } from 'react';
// import moviePosters from '../data/movie_posters';
import movieDetails from '../data/movie_details';
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
        setMovies([...movies, ...data])
      })
      .catch(error => console.log(error))
  }
  
  function selectMovie() {
    setChosenMovie(movieDetails);
  }

  function goBack() {
    setChosenMovie(null);
  }

  function upVote(movieId) {
    const updatedMovies = movies.map((movie) => {
      if (movie.id === movieId) {
        return { ...movie, vote_count: movie.vote_count + 1 };
      }
      return movie;
    });
    setMovies(updatedMovies);
  }

  function downVote(movieId) {
    const updatedMovies = movies.map((movie) => {
      if (movie.id === movieId) {
        return { ...movie, vote_count: movie.vote_count - 1 };
      }
      return movie;
    });
    setMovies(updatedMovies);
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
