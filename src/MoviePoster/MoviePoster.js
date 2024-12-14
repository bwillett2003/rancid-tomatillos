import './MoviePoster.css';
import VoteContainer from '../VoteContainer/VoteContainer';

function MoviePoster({ title, poster, votes, onUpVote, onDownVote, onSelectMovie }) {
  return (
    <section className='MoviePoster'>
      <img src={poster} alt={`${title} poster`} onClick={onSelectMovie} />
      <VoteContainer votes={votes} onUpVote={onUpVote} onDownVote={onDownVote}/>
    </section>
  );
}

export default MoviePoster;