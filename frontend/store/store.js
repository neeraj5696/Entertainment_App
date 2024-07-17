import {
    configureStore,
    createAsyncThunk,
    createSlice,
  } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY, TMBD_BASE_URL } from "../utility/constant";

const initialState = {
    movies: [],
    genreLoaded : false,
    genres : []
};

export const getGenres = createAsyncThunk("netflix/genres", async () => {
    const {
      data: { genres },
    } = await axios.get(
      `${TMBD_BASE_URL}/genre/movie/list?api_key= ${API_KEY}`
    );
    return genres;
  });
const NetFlixSlice = createSlice ({
    name: "Netflix",
    initialState,
    extraReducers: (builder)=>{}
});

export const store  = configureStore({
    reducer: {
        netflix: NetFlixSlice.reducer,
    }
});