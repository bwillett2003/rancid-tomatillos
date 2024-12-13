import './MoviePoster.css';
import VoteContainer from '../VoteContainer/VoteContainer';

function MoviePoster({ title, poster, votes }) {
  return (
    <section className='MoviePoster'>
      <img src={poster} alt={`${title} poster`} />
      <VoteContainer votes={votes} />
    </section>
  );
}

export default MoviePoster;