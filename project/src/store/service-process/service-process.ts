import {createSlice} from '@reduxjs/toolkit';
import {AuthorizationStatus, Namespace} from '../../const';
import {ServiceProcessType} from '../../types/state';
import {setLoadingStatusAction} from '../action';
import {checkAuthAction, loginAction, logoutAction} from '../api-actions';

const initialState: ServiceProcessType = {
  service: {
    authStatus: AuthorizationStatus.Unknown,
    isDataLoading: false,
  }
};

export const serviceProcess = createSlice({
  name: Namespace.Service,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(setLoadingStatusAction, (state, action) => {
        state.service.isDataLoading = action.payload;
      })
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.service.authStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.service.authStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.service.authStatus = AuthorizationStatus.Auth;
      })
      .addCase(loginAction.rejected, (state) => {
        state.service.authStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.service.authStatus = AuthorizationStatus.NoAuth;
      });
  }
});
