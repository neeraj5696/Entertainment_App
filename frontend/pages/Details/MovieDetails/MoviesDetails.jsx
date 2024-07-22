import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "../../../component/Sidebar";
// import "../pages/Details/MovieDEtails/MovieDetails.css"// Import the CSS file for styling

const MovieDetails = () => {
  const { id } = useParams();
  const movieList = useSelector((state) => state.netflix.movieList);
  const selectedMovie = movieList.find(
    (movie) => movie.id === parseInt(id)
  );

  if (!selectedMovie) {
    return <p>Movie not found.</p>;
  }

  return (
    <div className="details-container">
     
      <div className="movie-details">
        <h2>Movie Details</h2>
        <div className="details-content">
          <img
            src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
            alt={selectedMovie.title}
            className="movie-details-poster"
          />
          <div className="details-info">
            <p>
              <strong>Title:</strong> {selectedMovie.title}
            </p>
            <p>
              <strong>Overview:</strong> {selectedMovie.overview}
            </p>
            <p>
              <strong>Release Date:</strong> {selectedMovie.release_date}
            </p>
            <p>
              <strong>Vote Average:</strong> {selectedMovie.vote_average}
            </p>
            <p>
              <strong>Popularity:</strong> {selectedMovie.popularity}
            </p>
            <p>
              <strong>Original Language:</strong>{" "}
              {selectedMovie.original_language}
            </p>
            <p>
              <strong>Genres:</strong> {selectedMovie.genre_ids.join(", ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
