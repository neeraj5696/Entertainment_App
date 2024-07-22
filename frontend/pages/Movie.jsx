import React, { useState, useEffect } from "react";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../pages/Movies.css";
import { API_KEY } from "../utility/constant";
import Sidebar from "../component/Sidebar";
import { addBookmark, removeBookmark, setMovieSeries } from "../store/store";
import { useDispatch, useSelector } from "react-redux";

const Movies = () => {
  const [movieList, setMovieList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const dispatch = useDispatch();
  const bookmarkedMovies = useSelector((state) => state.netflix.bookmarkedMovies);
  const navigate = useNavigate(); // Use useNavigate for navigation

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`
        );
        const data = await response.json();
        setMovieList(data.results);
        setFilteredMovies(data.results);
        dispatch(setMovieSeries(data.results)); // Dispatch the MovieList to the store
      } catch (error) {
        console.error("Error fetching movie list:", error);
      }
    };

    fetchMovies();
  }, [dispatch]);

  const handleSearch = () => {
    const filtered = movieList.filter((movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  const handleBookmark = (movie) => {
    if (bookmarkedMovies.some((bm) => bm.id === movie.id)) {
      dispatch(removeBookmark(movie.id));
    } else {
      dispatch(addBookmark(movie));
    }
  };

  const handlePosterClick = (movie) => {
    navigate(`/MovieSeries/${movie.id}`); // Correct the navigation path
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="content">
        <div className="search-container">
          <input
            className="search"
            type="text"
            placeholder="Search for a movie..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>Search</button>
        </div>
        <div className="items-container">
          {filteredMovies.map((movie) => (
            <div key={movie.id} className="item">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="poster"
                onClick={() => handlePosterClick(movie)} // Handle poster click
              />
              <button
                className="bookmark-button"
                onClick={() => handleBookmark(movie)}
              >
                {bookmarkedMovies.some((bm) => bm.id === movie.id) ? <FaBookmark /> : <FaRegBookmark />}
              </button>
              <div className="flex">
                <div>
                  <p className="title">{movie.title.slice(0, 12)}</p>
                </div>
                <div>
                  <p className="vote_average">{movie.vote_average.toFixed(1)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Movies;
