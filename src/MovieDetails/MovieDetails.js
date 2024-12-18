// import './MovieDetails.css';
// import { useParams } from 'react-router-dom'

// function MovieDetails({ movies }) {
//   const { id } = useParams()  
//   const movie = movies.find((movie) => movie.id === parseInt(id))
  
//   if (!movies.length) {
//     return <p>Loading movie details...</p>;
//   }

//   if (!movie) {
//     // If no movie with matching ID is found
//     return <p>No movie found. Please go back and try again.</p>;
//   }

//   return (
//     <section className='MovieDetails'>
//       <img src={movie.backdrop_path} alt={`${movie.title}`}  />
//       <h2>{ movie.title }</h2>
//       <ul>
//         { movie.genre_ids.map( (genre, index) => (
//           <li key={index}>{genre}</li>
//         ))}
//       </ul>
//       <p>{ movie.overview }</p>
//     </section>
//   );
// }

// export default MovieDetails;

import './MovieDetails.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import homeIcon from '../icons/home.png';

function MovieDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [details, setDetails] = useState(null)

  useEffect(() => {
    fetch(`https://rancid-tomatillos-api.onrender.com/api/v1/movies/${id}`)
      .then((response) => response.json())
      .then((data) => setDetails(data))
      .catch((error) => console.log(error))
  }, [id])

  if (!details) {
    return <p>Loading...</p>
  }

  return (
    <section className="MovieDetails">
      <button className="home-button" onClick={() => navigate('/')}>
        <img src={homeIcon} alt="Home" />
      </button>
      <img src={details.backdrop_path} alt={`${details.title} backdrop`} />
      <h2>{details.title}</h2>
        <ul>
          { details.genre_ids.map( (genre, index) => (
            <li key={index}>{genre}</li>
        ))}
        </ul> 
      <p>{details.overview}</p>
    </section>
  )
}

export default MovieDetails