import {ActiveType} from '../../types/state';
import {createSlice} from '@reduxjs/toolkit';
import {Namespace} from '../../const';
import {fetchActiveDataAction, postToggleMyListMovie, postUserReviewAction} from '../api-actions';
import {MovieType, ReviewType} from '../../types/types';

export const initialState: ActiveType = {
  movie: null,
  similarMovies: [] as MovieType[],
  reviews: [] as ReviewType[],
};

export const active = createSlice({
  name: Namespace.Active,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchActiveDataAction.fulfilled, (state, action) => {
        state.movie = action.payload.movie;
        state.similarMovies = action.payload.similarMovies;
        state.reviews = action.payload.reviews;
      });

    builder
      .addCase(postUserReviewAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      });

    builder
      .addCase(postToggleMyListMovie.fulfilled, (state, action) => {
        if (state.movie?.id === action.payload.id) {
          state.movie = action.payload;
        }
      });
  }
});
