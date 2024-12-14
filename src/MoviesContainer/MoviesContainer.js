import './MoviesContainer.css';
import MoviePoster from '../MoviePoster/MoviePoster';

function Movies({ movies, onUpVote }) {
  return (
      <section className='MoviesContainer'>
        {movies.map(movie => (
        <MoviePoster 
          key={movie.id} 
          title={movie.title} 
          poster={movie.poster_path} 
          votes={movie.vote_count} 
          onUpVote={() => onUpVote(movie.id)}/>
      ))}
      </section>
  );
}
  
export default Movies;