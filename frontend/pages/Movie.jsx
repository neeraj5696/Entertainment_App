import React, { useState, useEffect } from "react";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import "../pages/Movies.css";
import { API_KEY } from "../utility/constant";
import Sidebar from "../component/Sidebar";
import { addBookmark, removeBookmark } from "../store/store";
import { useDispatch, useSelector } from "react-redux";

const Movies = () => {
  const [movieList, setMovieList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const dispatch = useDispatch();
  const bookmarkedMovies = useSelector((state) => state.netflix.bookmarkedMovies);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`
        );
        const data = await response.json();
        setMovieList(data.results);
        setFilteredMovies(data.results);
        console.log(data.results);
      } catch (error) {
        console.error("Error fetching movie list:", error);
      }
    };

    fetchMovies();
  }, []);

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

  return (
    <div className="app-container">
      <div>
        <Sidebar />
      </div>
      <div className="movies-content">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for a movie..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="movies-container">
          {filteredMovies.map((movie) => (
            <div key={movie.id} className="movie-item">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="movie/tv-poster"
              />
              <button
                className={`bookmark-button ${bookmarkedMovies.some((bm) => bm.id === movie.id) ? "bookmarked" : ""}`}
                onClick={() => handleBookmark(movie)}
              >
                {bookmarkedMovies.some((bm) => bm.id === movie.id) ? <FaBookmark /> : <FaRegBookmark />}
              </button>
              <div className="flex">
                <div>
                  <p className="movie-title">{movie.title.slice(0, 12)}</p>
                </div>
                <div>
                  <p className="movie-vote_average">{movie.vote_average.toFixed(1)}</p>
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
