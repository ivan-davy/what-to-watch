import {createSlice} from '@reduxjs/toolkit';
import {HomeType} from '../../types/state';
import {ALL_GENRES_FILTER_NAME, Namespace} from '../../const';
import {genreChangeAction} from '../action';
import {fetchHomeDataAction} from '../api-actions';

const initialState: HomeType = {
  home: {
    featuredMovie: null,
    selectedGenre: ALL_GENRES_FILTER_NAME,
    movies: [],
  }
};

export const home = createSlice({
  name: Namespace.Home,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(genreChangeAction, (state, action) => {
        state.home.selectedGenre = action.payload;
      })
      .addCase(fetchHomeDataAction.fulfilled, (state, action) => {
        state.home.featuredMovie = action.payload.featuredMovie;
        state.home.movies = action.payload.movies;
      });
  }
});
