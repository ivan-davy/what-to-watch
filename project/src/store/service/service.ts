import {createSlice} from '@reduxjs/toolkit';
import {AuthorizationStatus, Namespace, PageRoute} from '../../const';
import {ServiceType} from '../../types/state';
import {redirectToRouteAction, setLoadingStatusAction} from '../action';
import {
  checkAuthAction,
  fetchActiveDataAction,
  fetchHomeDataAction, fetchMyListMoviesAction,
  loginAction,
  logoutAction
} from '../api-actions';
import {store} from '../store';

export const initialState: ServiceType = {
  authStatus: AuthorizationStatus.Unknown,
  isDataLoading: false,
};

export const service = createSlice({
  name: Namespace.Service,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(setLoadingStatusAction, (state, action) => {
        state.isDataLoading = action.payload;
      });

    builder
      .addCase(fetchHomeDataAction.fulfilled, (state) => {
        state.isDataLoading = false;
      })
      .addCase(fetchHomeDataAction.pending, (state) => {
        setLoadingStatusAction(true);
      });

    builder
      .addCase(fetchActiveDataAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchActiveDataAction.fulfilled, (state) => {
        state.isDataLoading = false;
      })
      .addCase(fetchActiveDataAction.rejected, (state) => {
        state.isDataLoading = false;
        store.dispatch(redirectToRouteAction(PageRoute.NotFound));
      });

    builder
      .addCase(fetchMyListMoviesAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchMyListMoviesAction.fulfilled, (state) => {
        state.isDataLoading = false;
      })
      .addCase(fetchMyListMoviesAction.rejected, (state) => {
        state.isDataLoading = false;
      });

    builder
      .addCase(checkAuthAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.authStatus = AuthorizationStatus.Auth;
        state.isDataLoading = false;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authStatus = AuthorizationStatus.NoAuth;
        state.isDataLoading = false;
      });

    builder
      .addCase(loginAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.authStatus = AuthorizationStatus.Auth;
        state.isDataLoading = false;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authStatus = AuthorizationStatus.NoAuth;
        state.isDataLoading = false;
      });

    builder
      .addCase(logoutAction.fulfilled, (state) => {
        state.authStatus = AuthorizationStatus.NoAuth;
      });
  }
});
