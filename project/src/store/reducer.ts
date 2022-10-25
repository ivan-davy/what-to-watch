import {createReducer} from '@reduxjs/toolkit';
import {moviesMock} from '../mocks/movies';
import {genreChangeAction, genreResetAction} from './action';
import {allGenresFilterName} from '../const';

const initialState = {
  selectedGenreHome: allGenresFilterName,
  movies: moviesMock.slice(0, 7),
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(genreResetAction, (state) => {
      state.selectedGenreHome = allGenresFilterName;
    })
    .addCase(genreChangeAction, (state, action) => {
      state.selectedGenreHome = action.payload;
    });
});

export {reducer};
