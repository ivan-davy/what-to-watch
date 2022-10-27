import {createReducer} from '@reduxjs/toolkit';
import {genreChangeAction, genreResetAction, loadMoviesAction, requireAuthorizationAction} from './action';
import {ALL_GENRES_FILTER_NAME, AuthorizationStatus} from '../const';
import {MovieType} from '../types/types';

export type initialStateType = {
  selectedGenreHome: string;
  movies: MovieType[];
  authStatus: AuthorizationStatus;
}

const initialState: initialStateType = {
  selectedGenreHome: ALL_GENRES_FILTER_NAME,
  movies: [],
  authStatus: AuthorizationStatus.Unknown
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(genreResetAction, (state) => {
      state.selectedGenreHome = ALL_GENRES_FILTER_NAME;
    })
    .addCase(genreChangeAction, (state, action) => {
      state.selectedGenreHome = action.payload;
    })
    .addCase(loadMoviesAction, (state, action) => {
      state.movies = action.payload;
    })
    .addCase(requireAuthorizationAction, (state, action) => {
      state.authStatus = action.payload;
    });
});

export {reducer};
