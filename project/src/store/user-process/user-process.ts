import {createSlice} from '@reduxjs/toolkit';
import {Namespace} from '../../const';
import {UserProcessType} from '../../types/state';
import {loadMyListMoviesAction, loadUserDataAction, updateAuthStatusAction} from '../action';
import {checkAuthAction} from '../api-actions';

const initialState: UserProcessType = {
  user: {
    id: null,
    name: null,
    email: null,
    avatarUrl: null,
    token: null,
    myList: [],
  },
};

export const userProcess = createSlice({
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
      .addCase(updateAuthStatusAction, (state, action) => {
        state.authStatus = action.payload;
      })

  }
});
