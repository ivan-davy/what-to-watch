import {createReducer} from '@reduxjs/toolkit';
import {
  genreChangeAction,
  loadActiveMovieDataAction,
  loadMoviesHomeAction,
  requireAuthorizationAction
} from './action';
import {ALL_GENRES_FILTER_NAME, AuthorizationStatus, PLACEHOLDER_MOVIE} from '../const';
import {StateType} from '../types/types';

const initialState: StateType = {
  active: {
    movie: PLACEHOLDER_MOVIE,
    similar: [],
    reviews: [],
  },
  home: {
    featuredMovie: PLACEHOLDER_MOVIE,
    selectedGenre: ALL_GENRES_FILTER_NAME,
    movies: [],
  },
  authStatus: AuthorizationStatus.Unknown,
  isDataLoading: false
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(genreChangeAction, (state, action) => {
      state.home.selectedGenre = action.payload;
    })
    .addCase(loadMoviesHomeAction, (state, action) => {
      state.home.featuredMovie = action.payload.featuredMovie;
      state.home.movies = action.payload.movies;
    })
    .addCase(loadActiveMovieDataAction, (state, action) => {
      state.active = action.payload;
    })
    .addCase(requireAuthorizationAction, (state, action) => {
      state.authStatus = action.payload;
    });
});

export {reducer};
