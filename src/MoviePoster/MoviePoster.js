import './MoviePoster.css';
import VoteContainer from '../VoteContainer/VoteContainer';

function MoviePoster({ title, poster, votes, onUpVote }) {
  return (
    <section className='MoviePoster'>
      <img src={poster} alt={`${title} poster`} />
      <VoteContainer votes={votes} onUpVote={onUpVote}/>
    </section>
  );
}

export default MoviePoster;