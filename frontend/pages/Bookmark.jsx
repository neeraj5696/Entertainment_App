import React, { useState, useRef } from 'react';
import '../pages/Bookmark.css'; // Ensure you have the correct path

function Bookmark() {
  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);
  const scrollRef = useRef(null);

  

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (direction === 'left') {
      current.scrollLeft -= 200;
    } else {
      current.scrollLeft += 200;
    }
  };

  return (
    <div>
      <div className="bookmarked-section">
        <h2>Bookmarked Movies</h2>
        <button className="arrow-button left" onClick={() => scroll('left')}>&lt;</button>
        <div className="horizontal-scroll" ref={scrollRef}>
          {bookmarkedMovies.map((movie) => (
            <div key={movie.id} className="movie-item">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
              />
              <div className="flex">
                <div><p className="movie-title">{movie.title}</p></div>
                <div><p className="movie-vote_average">{movie.vote_average}</p></div>
              </div>
            </div>
          ))}
        </div>
        <button className="arrow-button right" onClick={() => scroll('right')}>&gt;</button>
      </div>
    </div>
  );
}

export default Bookmark;
