import React, { useState, useEffect } from "react";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import "../pages/Tvseries.css";
import { API_KEY } from "../utility/constant";
import Sidebar from "../component/Sidebar";
import { addTvSeriesBookmark, removeTvSeriesBookmark } from "../store/store";
import { useDispatch, useSelector } from "react-redux";

const TVSeries = () => {
  const [tvSeriesList, setTvSeriesList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTVSeries, setFilteredTVSeries] = useState([]);
  const [selectedTVSeries, setSelectedTVSeries] = useState(null); // State for selected TV series
  const dispatch = useDispatch();
  const bookmarkedTvSeries = useSelector((state) => state.netflix.bookmarkedTvSeries);

  useEffect(() => {
    const fetchTVSeries = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}`
        );
        const data = await response.json();
        setTvSeriesList(data.results);
        setFilteredTVSeries(data.results);
        console.log(data.results);
      } catch (error) {
        console.error("Error fetching TV series list:", error);
      }
    };

    fetchTVSeries();
  }, []);

  const handleSearch = () => {
    const filtered = tvSeriesList.filter((tvSeries) =>
      tvSeries.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTVSeries(filtered);
  };

  const handleBookmark = (tvSeries) => {
    if (bookmarkedTvSeries.find((t) => t.id === tvSeries.id)) {
      dispatch(removeTvSeriesBookmark(tvSeries));
    } else {
      dispatch(addTvSeriesBookmark(tvSeries));
    }
  };

  const isBookmarked = (tvSeries) => {
    return bookmarkedTvSeries.some((t) => t.id === tvSeries.id);
  };

  const handlePosterClick = (tvSeries) => {
    setSelectedTVSeries(tvSeries); // Set selected TV series
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="tvseries-content">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for a TV series..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="tvseries-container">
          {filteredTVSeries.map((tvSeries) => (
            <div key={tvSeries.id} className="tvseries-item">
              <img
                src={`https://image.tmdb.org/t/p/w500${tvSeries.poster_path}`}
                alt={tvSeries.name}
                className="tvseries-poster"
                onClick={() => handlePosterClick(tvSeries)} // Handle poster click
              />
              <button
                className="bookmark-button"
                onClick={() => handleBookmark(tvSeries)}
              >
                {isBookmarked(tvSeries) ? <FaBookmark /> : <FaRegBookmark />}
              </button>
              <div className="flex">
                <div>
                  <p className="tvseries-name">{tvSeries.name.slice(0, 12)}</p>
                </div>
                <div>
                  <p className="tvseries-vote_average">
                    {tvSeries.vote_average.toFixed(1)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {selectedTVSeries && ( // Conditionally render TV series details
          <div className="tvseries-details">
            <h2>TV Series Details</h2>
            <p><strong>Name:</strong> {selectedTVSeries.name}</p>
            <p><strong>Overview:</strong> {selectedTVSeries.overview}</p>
            <p><strong>First Air Date:</strong> {selectedTVSeries.first_air_date}</p>
            <p><strong>Vote Average:</strong> {selectedTVSeries.vote_average}</p>
            <p><strong>Popularity:</strong> {selectedTVSeries.popularity}</p>
            <p><strong>Original Language:</strong> {selectedTVSeries.original_language}</p>
            <p><strong>Genres:</strong> {selectedTVSeries.genre_ids.join(', ')}</p>
            <img
              src={`https://image.tmdb.org/t/p/w500${selectedTVSeries.poster_path}`}
              alt={selectedTVSeries.name}
              className="tvseries-details-poster"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TVSeries;
