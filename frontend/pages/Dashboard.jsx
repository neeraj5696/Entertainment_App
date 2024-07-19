import React, { useState, useEffect } from "react";
import "../pages/Dashboard.css";
import { FaRegBookmark } from "react-icons/fa";
import { API_KEY } from "../utility/constant";
import Sidebar from "../component/Sidebar";

const Dashboard = () => {
  const [movieList, setMovieList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`);
        const data = await response.json();
        setMovieList(data.results); // Make sure to access the 'results' property which contains the list of movies
        setFilteredMovies(data.result)
      } catch (error) {
        console.error("Error fetching movie list:", error);
      }
    };

    fetchMovies();
  }, []);
 
  const handleSearch = ()=>{
    const filtered = movieList.filter(movie =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMovies(filtered)
  }

  const handleBookmark = (movie)=>{
    setBookmarkedMovies((prev) =>[...prev, movie])
  }
  

  return (
    <div className="app-container">
      <Sidebar />
      <div className="movies-content">
        <div>
          <input type="text" placeholder="Search" value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="movies-container">
          {movieList.map((movie) => (
            <img key={movie.id} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="movie-poster" />
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
               <button 
                className="bookmark-button" 
                onClick={() => handleBookmark(movie)}
              >
                <FaRegBookmark />
              </button>
              <div className="flex">
                <div><p className="movie-title">{movie.title.slice(0, 12)}</p></div>
                <div><p className="movie-vote_average">{movie.vote_average}</p></div>
              </div>
             
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};

export default Dashboard;

