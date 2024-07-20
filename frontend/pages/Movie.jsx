import React, { useState, useEffect } from "react";
import { FaRegBookmark } from "react-icons/fa";
import "../pages/Movies.css";
import { API_KEY } from "../utility/constant";
import Sidebar from "../component/Sidebar";
import { addBookmark } from "../store/store";
import { useDispatch } from "react-redux";

const Movies = () => {
  const [movieList, setMovieList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`
        );
        const data = await response.json();
        setMovieList(data.results);
        setFilteredMovies(data.results);
        console.log(data.results)
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
    dispatch(addBookmark(movie));
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
                className="bookmark-button"
                onClick={() => handleBookmark(movie)}
              >
                <FaRegBookmark />
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
        <div className="bookmarked-section">
          <h2>Bookmarked Movies</h2>
          <div className="movies-container">
            {bookmarkedMovies.map((movie) => (
              <div key={movie.id} className="movie-item">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-poster"
                />
                <div className="flex">
                  <div>
                    <p className="movie-title">{movie.title}</p>
                  </div>
                  <div>
                    <p className="movie-vote_average">{movie.vote_average}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movies;
