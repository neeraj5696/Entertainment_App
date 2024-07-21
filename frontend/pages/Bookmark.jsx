import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../pages/Bookmark.css';
import Sidebar from '../component/Sidebar';
import { FaBookmark } from "react-icons/fa";
import { removeBookmark, removeTvSeriesBookmark } from '../store/store';

function Bookmark() {
  const bookmarkedMovies = useSelector((state) => state.netflix.bookmarkedMovies);
  const bookmarkedTvSeries = useSelector((state) => state.netflix.bookmarkedTvSeries);
  const scrollRef = useRef(null);
  const dispatch = useDispatch();

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (direction === 'left') {
      current.scrollLeft -= 200;
    } else {
      current.scrollLeft += 200;
    }
  };

  const handleRemoveBookmark = (movie) => {
    dispatch(removeBookmark(movie.id));
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
                <button
                  className="bookmark-button bookmarked"
                  onClick={() => handleRemoveBookmark(movie)}
                >
                  <FaBookmark />
                </button>
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
          <div className="horizontal-scroll" ref={scrollRef}>
            {bookmarkedTvSeries.map((tvSeries) => (
              <div key={tvSeries.id} className="tvseries-item">
                <img
                  src={`https://image.tmdb.org/t/p/w500${tvSeries.poster_path}`}
                  alt={tvSeries.name}
                  className="tvseries-poster"
                />
                <button
                  className="bookmark-button bookmarked"
                  onClick={() => dispatch(removeTvSeriesBookmark(tvSeries.id))}
                >
                  <FaBookmark />
                </button>
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
