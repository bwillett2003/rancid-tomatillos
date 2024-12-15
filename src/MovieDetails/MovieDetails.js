import './MovieDetails.css';

function MovieDetails({ details }) {
  return (
    <section className='MovieDetails'>
      <img src={details.backdrop_path} alt={`${details.title}`}  />
      <h2>{ details.title }</h2>
      <ul>
        { details.genre_ids.map( (genre, index) => (
          <li key={index}>{genre}</li>
        ))}
      </ul>
      <p>{ details.overview }</p>
    </section>
  );
}

export default MovieDetails;