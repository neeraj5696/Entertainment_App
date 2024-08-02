import React, { useState, useEffect } from "react";
import { FaRegBookmark, FaBookmark, FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../pages/MoviesAndTVSeries.css";
import { API_KEY } from "../utility/constant";
import Sidebar from "../component/Sidebar";
import { addTvSeriesBookmark, removeTvSeriesBookmark, setTVSeries } from "../store/store";
import { useDispatch, useSelector } from "react-redux";

const TVSeries = () => {
  const [tvSeriesList, setTvSeriesList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTVSeries, setFilteredTVSeries] = useState([]);
  const dispatch = useDispatch();
  const bookmarkedTvSeries = useSelector((state) => state.netflix.bookmarkedTvSeries);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTVSeries = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}`
        );
        const data = await response.json();
        setTvSeriesList(data.results);
        setFilteredTVSeries(data.results);
        dispatch(setTVSeries(data.results));
      } catch (error) {
        console.error("Error fetching TV series list:", error);
      }
    };

    fetchTVSeries();
  }, [dispatch]);

  const handleSearch = () => {
    const filtered = tvSeriesList.filter((tvSeries) =>
      tvSeries.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTVSeries(filtered);
  };

  const handleBookmark = (tvSeries) => {
    if (bookmarkedTvSeries.find((t) => t.id === tvSeries.id)) {
      dispatch(removeTvSeriesBookmark(tvSeries.id));
    } else {
      dispatch(addTvSeriesBookmark(tvSeries));
    }
  };

  const isBookmarked = (tvSeries) => {
    return bookmarkedTvSeries.some((t) => t.id === tvSeries.id);
  };

  const handlePosterClick = (tvSeries) => {
    navigate(`/tvseries/${tvSeries.id}`);
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="content">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for a TV series..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="items-container">
          {filteredTVSeries.map((tvSeries) => (
            <div key={tvSeries.id} className="item">
              <div className="poster-container">
                <img
                  src={`https://image.tmdb.org/t/p/w500${tvSeries.poster_path}`}
                  alt={tvSeries.name}
                  className="poster"
                  onClick={() => handlePosterClick(tvSeries)}
                />
                <button className="bookmark-button" onClick={() => handleBookmark(tvSeries)}>
                  {isBookmarked(tvSeries) ? <FaBookmark /> : <FaRegBookmark />}
                </button>
                <button className="replay-button" onClick={() => handlePosterClick(tvSeries)}>
                  <FaPlay />
                </button>
              </div>
              <div className="flex">
                <p className="title tvseries-name">{tvSeries.name}</p>
                <p className="vote_average tvseries-vote_average">
                  {tvSeries.vote_average.toFixed(1)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TVSeries;
