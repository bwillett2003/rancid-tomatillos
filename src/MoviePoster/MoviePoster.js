import './MoviePoster.css';

function MoviePoster({ title, poster, votes }) {
  return (
    <section className='MoviePoster'>
      <img src={poster} alt={`${title} poster`} />
      <p>{votes}</p>
    </section>
  );
}

export default MoviePoster;