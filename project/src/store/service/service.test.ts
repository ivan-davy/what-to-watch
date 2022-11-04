import {service, initialState} from './service';
import {setLoadingStatusAction} from '../action';
import {
  checkAuthAction,
  fetchActiveDataAction,
  fetchHomeDataAction,
  fetchMyListMoviesAction,
  loginAction, logoutAction
} from '../api-actions';
import {AuthorizationStatus} from '../../const';

describe('Reducer: service', () => {
  it('without additional parameters should return initial state', () => {
    expect(service.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should change isDataLoading flag to a requested value', () => {
    expect(service.reducer(initialState, {type: setLoadingStatusAction, payload: true}))
      .toEqual({...initialState, isDataLoading: true});
  });


  it('should change isDataLoading flag to true while fetchHomeDataAction is pending', () => {
    expect(service.reducer(initialState, {type: fetchHomeDataAction.pending}))
      .toEqual({...initialState, isDataLoading: true});
  });

  it('should change isDataLoading flag to false while fetchHomeDataAction is fulfilled', () => {
    expect(service.reducer(initialState, {type: fetchHomeDataAction.fulfilled}))
      .toEqual({...initialState, isDataLoading: false});
  });


  it('should change isDataLoading flag to true while fetchActiveDataAction is pending', () => {
    expect(service.reducer(initialState, {type: fetchActiveDataAction.pending}))
      .toEqual({...initialState, isDataLoading: true});
  });

  it('should change isDataLoading flag to false while fetchActiveDataAction is fulfilled', () => {
    expect(service.reducer(initialState, {type: fetchActiveDataAction.fulfilled}))
      .toEqual({...initialState, isDataLoading: false});
  });

  it('should change isDataLoading flag to false while fetchActiveDataAction is rejected', () => {
    expect(service.reducer(initialState, {type: fetchActiveDataAction.rejected}))
      .toEqual({...initialState, isDataLoading: false});
  });


  it('should change isDataLoading flag to true while fetchMyListMoviesAction is pending', () => {
    expect(service.reducer(initialState, {type: fetchMyListMoviesAction.pending}))
      .toEqual({...initialState, isDataLoading: true});
  });

  it('should change isDataLoading flag to false while fetchMyListMoviesAction is fulfilled', () => {
    expect(service.reducer(initialState, {type: fetchMyListMoviesAction.fulfilled}))
      .toEqual({...initialState, isDataLoading: false});
  });

  it('should change isDataLoading flag to false while fetchMyListMoviesAction is rejected', () => {
    expect(service.reducer(initialState, {type: fetchMyListMoviesAction.rejected}))
      .toEqual({...initialState, isDataLoading: false});
  });


  it('should change isDataLoading flag to true while checkAuthAction is pending', () => {
    expect(service.reducer(initialState, {type: checkAuthAction.pending}))
      .toEqual({...initialState, isDataLoading: true});
  });

  it('should change isDataLoading flag to false and authStatus to true while checkAuthAction is fulfilled', () => {
    expect(service.reducer(initialState, {type: checkAuthAction.fulfilled}))
      .toEqual({authStatus: AuthorizationStatus.Auth, isDataLoading: false});
  });

  it('should change isDataLoading flag to false and authStatus to false while checkAuthAction is rejected', () => {
    expect(service.reducer(initialState, {type: checkAuthAction.rejected}))
      .toEqual({authStatus: AuthorizationStatus.NoAuth, isDataLoading: false});
  });


  it('should change isDataLoading flag to true while loginAction is pending', () => {
    expect(service.reducer(initialState, {type: loginAction.pending}))
      .toEqual({...initialState, isDataLoading: true});
  });

  it('should change isDataLoading flag to false and authStatus to true while loginAction is fulfilled', () => {
    expect(service.reducer(initialState, {type: loginAction.fulfilled}))
      .toEqual({authStatus: AuthorizationStatus.Auth, isDataLoading: false});
  });

  it('should change isDataLoading flag to false and authStatus to false while loginAction is rejected', () => {
    expect(service.reducer(initialState, {type: loginAction.rejected}))
      .toEqual({authStatus: AuthorizationStatus.NoAuth, isDataLoading: false});
  });


  it('should change  authStatus to false while logoutAction is fulfilled', () => {
    expect(service.reducer(initialState, {type: logoutAction.fulfilled}))
      .toEqual({...initialState, authStatus: AuthorizationStatus.NoAuth});
  });
});

