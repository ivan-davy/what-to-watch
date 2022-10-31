import {ActiveType} from '../../types/state';
import {createSlice} from '@reduxjs/toolkit';
import {Namespace, PageRoute} from '../../const';
import {redirectToRouteAction, setLoadingStatusAction} from '../action';
import {fetchActiveMovieDataAction} from '../api-actions';
import {store} from '../store';

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
      .addCase(fetchActiveMovieDataAction.pending, () => {
        store.dispatch(setLoadingStatusAction(true));
      })
      .addCase(fetchActiveMovieDataAction.fulfilled, (state, action) => {
        state.active = action.payload;
        store.dispatch(setLoadingStatusAction(false));
      })
      .addCase(fetchActiveMovieDataAction.rejected, () => {
        store.dispatch(setLoadingStatusAction(false));
        store.dispatch(redirectToRouteAction(PageRoute.NotFound));
      })
  }
});
