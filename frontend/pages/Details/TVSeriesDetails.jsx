import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "../../component/Sidebar";
import "./TVSeriesDetails.css"; // Import the CSS file for styling

const TVSeriesDetails = () => {
  const { id } = useParams();
  const tvSeriesList = useSelector((state) => state.netflix.tvSeriesList);
  const selectedTVSeries = tvSeriesList.find(
    (series) => series.id === parseInt(id)
  );

  if (!selectedTVSeries) {
    return <p>TV Series not found.</p>;
  }

  return (
    <div className="details-container">
      
      <div className="tvseries-details">
        <h2>TV Series Details</h2>
        <div className="details-content">
          <img
            src={`https://image.tmdb.org/t/p/w500${selectedTVSeries.poster_path}`}
            alt={selectedTVSeries.name}
            className="tvseries-details-poster"
          />
          <div className="details-info">
            <p>
              <strong>Name:</strong> {selectedTVSeries.name}
            </p>
            <p>
              <strong>Overview:</strong> {selectedTVSeries.overview}
            </p>
            <p>
              <strong>First Air Date:</strong> {selectedTVSeries.first_air_date}
            </p>
            <p>
              <strong>Vote Average:</strong> {selectedTVSeries.vote_average}
            </p>
            <p>
              <strong>Popularity:</strong> {selectedTVSeries.popularity}
            </p>
            <p>
              <strong>Original Language:</strong>{" "}
              {selectedTVSeries.original_language}
            </p>
            <p>
              <strong>Genres:</strong> {selectedTVSeries.genre_ids.join(", ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TVSeriesDetails;
