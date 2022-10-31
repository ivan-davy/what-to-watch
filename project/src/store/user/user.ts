import {createSlice} from '@reduxjs/toolkit';
import {Namespace} from '../../const';
import {UserType} from '../../types/state';
import {loadMyListMoviesAction, loadUserDataAction, setLoadingStatusAction, updateAuthStatusAction} from '../action';
import {fetchMyListMoviesAction} from '../api-actions';

const initialState: UserType = {
  user: {
    id: null,
    name: null,
    email: null,
    avatarUrl: null,
    token: null,
    myList: [],
  },
};

export const user = createSlice({
  name: Namespace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loadUserDataAction, (state, action) => {
        state.user = action.payload;
      })
      .addCase(loadMyListMoviesAction, (state, action) => {
        state.user.myList = action.payload;
      })
      .addCase(fetchMyListMoviesAction.pending, (state, action) => {
        store.dispatch(setLoadingStatusAction(true));
      })
      .addCase(fetchMyListMoviesAction.fulfilled, (state, action) => {
        state.user.myList = action.payload;
        store.dispatch(setLoadingStatusAction(false))
      });
  }
});
