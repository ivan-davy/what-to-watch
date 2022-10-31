import {ActiveProcessType} from '../../types/state';
import {createSlice} from '@reduxjs/toolkit';
import {Namespace} from '../../const';
import {loadActiveMovieDataAction, updateUserReviewsAction} from '../action';

const initialState: ActiveProcessType = {
  active: {
    movie: null,
    similar: [],
    reviews: [],
  },
};

export const activeProcess = createSlice({
  name: Namespace.Active,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loadActiveMovieDataAction, (state, action) => {
        state.active = action.payload;
      })
      .addCase(updateUserReviewsAction, (state, action) => {
        state.active.reviews = action.payload;
      });
  }
});
