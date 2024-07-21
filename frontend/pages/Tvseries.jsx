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

  return (
    <div className="app-container">
      <div>
        <Sidebar />
      </div>
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
      </div>
    </div>
  );
};

export default TVSeries;
