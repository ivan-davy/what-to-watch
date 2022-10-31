import {createSlice} from '@reduxjs/toolkit';
import {HomeProcessType} from '../../types/state';
import {ALL_GENRES_FILTER_NAME, Namespace} from '../../const';
import {genreChangeAction, loadHomeMovieDataAction} from '../action';

const initialState: HomeProcessType = {
  home: {
    featuredMovie: null,
    selectedGenre: ALL_GENRES_FILTER_NAME,
    movies: [],
  }
};

export const homeProcess = createSlice({
  name: Namespace.Home,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(genreChangeAction, (state, action) => {
        state.home.selectedGenre = action.payload;
      })
      .addCase(loadHomeMovieDataAction, (state, action) => {
        state.home.featuredMovie = action.payload.featuredMovie;
        state.home.movies = action.payload.movies;
      });
  }
});
