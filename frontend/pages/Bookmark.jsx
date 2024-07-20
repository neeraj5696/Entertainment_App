import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import '../pages/Bookmark.css'; 
import Sidebar from '../component/Sidebar';

function Bookmark() {
  const bookmarkedMovies = useSelector((state) => state.netflix.bookmarkedMovies); // to Get bookmarked movies from Redux
  const bookmarkedTvSeries = useSelector((state) => state.netflix.bookmarkedTvSeries); // Corrected here
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
    <div className='bookmark-container'>
      <div><Sidebar /></div>
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
                  <div><p className="movie-vote_average">{movie.vote_average.toFixed(1)}</p></div>
                </div>
              </div>
            ))}
          </div>
          <button className="arrow-button right" onClick={() => scroll('right')}>&gt;</button>
        </div>
        <div className="bookmarked-section">
          <h2>Bookmarked TV Series</h2>
          <div className="horizontal-scroll" ref={scrollRef}> {/* Corrected here */}
            {bookmarkedTvSeries.map((tvSeries) => (
              <div key={tvSeries.id} className="tvseries-item">
                <img
                  src={`https://image.tmdb.org/t/p/w500${tvSeries.poster_path}`}
                  alt={tvSeries.name}
                  className="tvseries-poster"
                />
                <div className="flex">
                  <div>
                    <p className="tvseries-name">{tvSeries.name}</p>
                  </div>
                  <div>
                    <p className="tvseries-vote_average">{tvSeries.vote_average.toFixed(1)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bookmark;
