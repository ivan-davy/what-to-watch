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
        setLoadingStatusAction(false);
      })
      .addCase(fetchHomeDataAction.pending, (state) => {
        setLoadingStatusAction(true);
      });

    builder
      .addCase(fetchActiveDataAction.pending, (state) => {
        setLoadingStatusAction(true);
      })
      .addCase(fetchActiveDataAction.fulfilled, (state) => {
        setLoadingStatusAction(false);
      })
      .addCase(fetchActiveDataAction.rejected, (state) => {
        setLoadingStatusAction(false);
        store.dispatch(redirectToRouteAction(PageRoute.NotFound));
      });

    builder
      .addCase(fetchMyListMoviesAction.pending, (state) => {
        setLoadingStatusAction(true);
      })
      .addCase(fetchMyListMoviesAction.fulfilled, (state) => {
        setLoadingStatusAction(false);
      })
      .addCase(fetchMyListMoviesAction.rejected, (state) => {
        setLoadingStatusAction(false);
      });

    builder
      .addCase(checkAuthAction.pending, (state) => {
        setLoadingStatusAction(true);
      })
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.authStatus = AuthorizationStatus.Auth;
        setLoadingStatusAction(false);
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authStatus = AuthorizationStatus.NoAuth;
        setLoadingStatusAction(false);
      });

    builder
      .addCase(loginAction.pending, (state) => {
        setLoadingStatusAction(true);
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.authStatus = AuthorizationStatus.Auth;
        setLoadingStatusAction(false);
      })
      .addCase(loginAction.rejected, (state) => {
        state.authStatus = AuthorizationStatus.NoAuth;
        setLoadingStatusAction(false);
      });

    builder
      .addCase(logoutAction.fulfilled, (state) => {
        state.authStatus = AuthorizationStatus.NoAuth;
      });
  }
});
