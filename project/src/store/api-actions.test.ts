import {createApi} from '../api/api';
import MockAdapter from 'axios-mock-adapter';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {State} from '../types/state';
import {Action} from '@reduxjs/toolkit';
import {ApiRoute} from '../const';
import {
  checkAuthAction,
  fetchActiveDataAction,
  fetchHomeDataAction, fetchMyListMoviesAction, loginAction, logoutAction,
  postToggleMyListMovie,
  postUserReviewAction
} from './api-actions';
import {redirectToRouteAction, setLoadingStatusAction} from './action';
import {
  makeAuthDataType,
  makeFakeHomeData,
  makeFakeMovie,
  makeFakeReviews,
  makeFakeUserData,
  makeFakeUserReview
} from '../mocks/mocks';

describe('Async actions', () => {
  const api = createApi();
  const mockApi = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<State,
    Action<string>,
    ThunkDispatch<State, typeof api, Action>>(middlewares);

  it('should fetch home data', async () => {
    const store = mockStore();
    mockApi
      .onGet(ApiRoute.Movies)
      .reply(200, makeFakeHomeData().movies)
      .onGet(ApiRoute.Featured)
      .reply(200, makeFakeHomeData().featuredMovie);

    await store.dispatch(fetchHomeDataAction());
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchHomeDataAction.pending.type,
      fetchHomeDataAction.fulfilled.type,
    ]);
  });

  it('should fetch active data', async () => {
    const store = mockStore();
    mockApi
      .onGet(`${ApiRoute.Movies}/${1}`)
      .reply(200, makeFakeMovie())
      .onGet(`${ApiRoute.Movies}/${1}${ApiRoute.Similar}`)
      .reply(200, [makeFakeMovie()])
      .onGet(`${ApiRoute.Reviews}/${1}`)
      .reply(200, makeFakeReviews());

    await store.dispatch(fetchActiveDataAction('1'));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchActiveDataAction.pending.type,
      fetchActiveDataAction.fulfilled.type,
    ]);
  });

  it('should redirect if active data fetch failed', async () => {
    const store = mockStore();
    mockApi
      .onGet(`${ApiRoute.Movies}/${1}`)
      .reply(404, makeFakeMovie());

    await store.dispatch(fetchActiveDataAction('1'));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchActiveDataAction.pending.type,
      redirectToRouteAction.type,
      fetchActiveDataAction.rejected.type,
    ]);
  });

  it('should post user comment', async () => {
    const store = mockStore();
    mockApi
      .onPost(`${ApiRoute.Reviews}/${1}`)
      .reply(200, makeFakeReviews());

    await store.dispatch(postUserReviewAction({
      userReview: makeFakeUserReview(),
      setFormSubmitStateCb: ()=>null,
      activeId: 1}));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      postUserReviewAction.pending.type,
      redirectToRouteAction.type,
      postUserReviewAction.fulfilled.type,
    ]);
  });

  it('should update myList movie status', async () => {
    const store = mockStore();
    mockApi
      .onPost(`${ApiRoute.MyList}/${1}/${1}`)
      .reply(200, makeFakeMovie());

    await store.dispatch(postToggleMyListMovie({movieId: 1, actionId: 1}));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      postToggleMyListMovie.pending.type,
      postToggleMyListMovie.fulfilled.type,
    ]);
  });

  it('should fetch myList movies', async () => {
    const store = mockStore();
    mockApi
      .onGet(`${ApiRoute.MyList}`)
      .reply(200, [makeFakeMovie()]);

    await store.dispatch(fetchMyListMoviesAction());
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchMyListMoviesAction.pending.type,
      fetchMyListMoviesAction.fulfilled.type,
    ]);
  });


  it('should check for auth status', async () => {
    const store = mockStore();
    mockApi
      .onGet(ApiRoute.Login)
      .reply(200, makeFakeUserData())
      .onGet(`${ApiRoute.MyList}`)
      .reply(200, [makeFakeMovie()]);

    await store.dispatch(checkAuthAction());
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      setLoadingStatusAction.type,
      checkAuthAction.fulfilled.type,
    ]);
  });

  it('should log in', async () => {
    const store = mockStore();
    mockApi
      .onPost(ApiRoute.Login)
      .reply(200, makeFakeUserData());

    await store.dispatch(loginAction(makeAuthDataType()));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      loginAction.pending.type,
      loginAction.fulfilled.type,
    ]);
  });

  it('should log out', async () => {
    const store = mockStore();
    mockApi
      .onDelete(ApiRoute.Logout)
      .reply(200);

    await store.dispatch(logoutAction());
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      logoutAction.pending.type,
      logoutAction.fulfilled.type,
    ]);
  });
});
