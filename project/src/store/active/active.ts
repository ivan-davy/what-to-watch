import {ActiveType} from '../../types/state';
import {createSlice} from '@reduxjs/toolkit';
import {Namespace} from '../../const';
import {fetchActiveDataAction, postUserReviewAction} from '../api-actions';

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
        state = action.payload;
      });

    builder
      .addCase(postUserReviewAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      });
  }
});
