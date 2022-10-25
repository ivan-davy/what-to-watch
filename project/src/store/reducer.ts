import {createReducer} from '@reduxjs/toolkit';
import {moviesMock} from '../mocks/movies';
import {genreChange, genreReset} from './action';
import {GenreFilter} from '../const';

const initialState = {
  selectedGenreHome: 'All',
  movies: moviesMock.slice(0, 7),
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(genreReset, (state) => {
      state.selectedGenreHome = GenreFilter.All;
    })
    .addCase(genreChange, (state, action) => {
      state.selectedGenreHome = action.payload;
    });
});

export {reducer};
