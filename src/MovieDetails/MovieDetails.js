import './MovieDetails.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import homeIcon from '../icons/home.png';

function MovieDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [details, setDetails] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`https://rancid-tomatillos-api.onrender.com/api/v1/movies/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Movie not found')
        }
        return response.json()
      })
      .then((data) => setDetails(data))
      .catch((error) => setError(error.message))
  }, [id])

  if (error) {
    return (
      <section className="error">
        <button className="home-button" onClick={() => navigate('/')}>
          <img src={homeIcon} alt="Home Icon button" />
        </button>
        <h2>Error</h2>
        <p>{error}</p>
        <a href="/" className="home-link">Go back to the homepage</a>
      </section>
    );
  }

  if (!details) {
    return <p>Loading...</p>
  }

  return (
    <section className="MovieDetails">
      <button className="home-button" onClick={() => navigate('/')}>
        <img src={homeIcon} alt="Home Icon button" />
      </button>
      <img src={details.backdrop_path} alt={`${details.title}, Movie details backdrop image`} />
      <h2>{details.title}</h2>
        <ul>
          {details.genre_ids.map((genre, index) => (
            <li key={index}>{genre}</li>
          ))}
        </ul> 
      <p>{details.overview}</p>
    </section>
  )
}

export default MovieDetails