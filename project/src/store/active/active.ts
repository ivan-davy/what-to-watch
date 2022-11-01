import {ActiveType} from '../../types/state';
import {createSlice} from '@reduxjs/toolkit';
import {Namespace} from '../../const';
import {fetchActiveMovieDataAction, postUserReviewAction} from '../api-actions';

const initialState: ActiveType = {
  active: {
    movie: null,
    similar: [],
    reviews: [],
  },
};

export const active = createSlice({
  name: Namespace.Active,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchActiveMovieDataAction.fulfilled, (state, action) => {
        state.active = action.payload;
      })
      .addCase(postUserReviewAction.fulfilled, (state, action) => {
        state.active.reviews = action.payload;
      });
  }
});
