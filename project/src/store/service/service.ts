import {createSlice} from '@reduxjs/toolkit';
import {AuthorizationStatus, Namespace, PageRoute} from '../../const';
import {ServiceType} from '../../types/state';
import {redirectToRouteAction, setLoadingStatusAction, updateAuthStatusAction} from '../action';
import {
  checkAuthAction,
  fetchActiveMovieDataAction,
  fetchHomeDataAction, fetchMyListMoviesAction,
  loginAction,
  logoutAction
} from '../api-actions';
import {store} from '../store';

const initialState: ServiceType = {
  service: {
    authStatus: AuthorizationStatus.Unknown,
    isDataLoading: false,
  }
};

export const service = createSlice({
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
      })
      .addCase(fetchHomeDataAction.fulfilled, (state) => {
        state.service.isDataLoading = false;
      })
      .addCase(fetchHomeDataAction.pending, (state) => {
        state.service.isDataLoading = true;
      })
      .addCase(fetchActiveMovieDataAction.pending, (state) => {
        state.service.isDataLoading = true;
      })
      .addCase(fetchActiveMovieDataAction.fulfilled, (state) => {
        state.service.isDataLoading = false;
      })
      .addCase(fetchActiveMovieDataAction.rejected, (state) => {
        state.service.isDataLoading = false;
        store.dispatch(redirectToRouteAction(PageRoute.NotFound));
      })
      .addCase(fetchMyListMoviesAction.pending, (state) => {
        state.service.isDataLoading = true;
      })
      .addCase(fetchMyListMoviesAction.fulfilled, (state) => {
        state.service.isDataLoading = false;
      })
      .addCase(fetchMyListMoviesAction.rejected, (state) => {
        state.service.isDataLoading = false;
      })
      .addCase(checkAuthAction.pending, (state) => {
        state.service.isDataLoading = true;
      })
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.service.authStatus = AuthorizationStatus.Auth;
        state.service.isDataLoading = false;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.service.authStatus = AuthorizationStatus.NoAuth;
        state.service.isDataLoading = false;
      })
      .addCase(loginAction.pending, (state) => {
        state.service.isDataLoading = true;
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.service.authStatus = AuthorizationStatus.Auth;
        state.service.isDataLoading = false;
      })
      .addCase(loginAction.rejected, (state) => {
        state.service.authStatus = AuthorizationStatus.NoAuth;
        state.service.isDataLoading = false;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.service.authStatus = AuthorizationStatus.NoAuth;
      });
  }
});
