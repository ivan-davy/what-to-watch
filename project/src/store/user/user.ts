import {createSlice} from '@reduxjs/toolkit';
import {Namespace} from '../../const';
import {UserType} from '../../types/state';
import {checkAuthAction, fetchMyListMoviesAction, loginAction} from '../api-actions';

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
      .addCase(fetchMyListMoviesAction.fulfilled, (state, action) => {
        state.user.myList = action.payload;
      })
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  }
});
