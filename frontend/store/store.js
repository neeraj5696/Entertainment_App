import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
  genresLoaded: false,
  genres: [],
  bookmarkedMovies: [],
  bookmarkedTvSeries: [],
  tvSeriesList: [],
  movieList: [] 
};

const NetflixSlice = createSlice({
  name: "Netflix",
  initialState,
  reducers: {
    setGenres: (state, action) => {
      state.genres = action.payload;
      state.genresLoaded = true;
    },
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    setTVSeries: (state, action) => {
      state.tvSeriesList = action.payload; // Add setTVSeries reducer
    },
    setMovieSeries: (state, action) => {
      state.movieList = action.payload; // moviesSeries reducer
    },
    addBookmark: (state, action) => {
      state.bookmarkedMovies.push(action.payload);
    },
    addTvSeriesBookmark: (state, action) => {
      state.bookmarkedTvSeries.push(action.payload);
    },
    removeBookmark: (state, action) => {
      state.bookmarkedMovies = state.bookmarkedMovies.filter(
        (movie) => movie.id !== action.payload
      );
    },
    removeTvSeriesBookmark: (state, action) => {
      state.bookmarkedTvSeries = state.bookmarkedTvSeries.filter(
        (tvSeries) => tvSeries.id !== action.payload
      );
    },
  },
});

export const {
  setGenres,
  setMovies,
  setTVSeries,
  setMovieSeries,
  addBookmark,
  addTvSeriesBookmark,
  removeBookmark,
  removeTvSeriesBookmark,
} = NetflixSlice.actions;

export const store = configureStore({
  reducer: {
    netflix: NetflixSlice.reducer,
  },
});
