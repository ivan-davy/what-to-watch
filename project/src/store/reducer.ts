import {createReducer} from '@reduxjs/toolkit';
import {moviesMock} from '../mocks/movies';
import {genreChangeAction, genreResetAction} from './action';
import {ALL_GENRES_FILTER_NAME} from '../const';

const initialState = {
  selectedGenreHome: ALL_GENRES_FILTER_NAME,
  movies: moviesMock.slice(0, 7),
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(genreResetAction, (state) => {
      state.selectedGenreHome = ALL_GENRES_FILTER_NAME;
    })
    .addCase(genreChangeAction, (state, action) => {
      state.selectedGenreHome = action.payload;
    });
});

export {reducer};
