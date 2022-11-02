import {ActiveType} from '../../types/state';
import {createSlice} from '@reduxjs/toolkit';
import {Namespace} from '../../const';
import {fetchActiveDataAction, postToggleMyListMovie, postUserReviewAction} from '../api-actions';

const initialState: ActiveType = {
  movie: null,
  similar: [],
  reviews: [],
};

export const active = createSlice({
  name: Namespace.Active,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchActiveDataAction.fulfilled, (state, action) => {
        state.movie = action.payload.movie;
        state.similar = action.payload.similar;
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
