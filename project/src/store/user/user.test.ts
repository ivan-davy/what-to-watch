import {initialState, user} from './user';
import {
  checkAuthAction,
  fetchMyListMoviesAction,
  loginAction,
  postToggleMyListMovie
} from '../api-actions';
import {makeFakeMovie, makeFakeUserData} from '../../mocks/mocks';

describe('Reducer: service', () => {
  it('without additional parameters should return initial state', () => {
    expect(user.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should update myList contents after a successful fetch', () => {
    expect(user.reducer(initialState, {type: fetchMyListMoviesAction.fulfilled, payload: [makeFakeMovie()]}))
      .toEqual({...initialState, myList: [makeFakeMovie()]});
  });

  it('should update the state after successful checkAuth action', () => {
    expect(user.reducer(initialState, {type: checkAuthAction.fulfilled, payload: makeFakeUserData()}))
      .toEqual(makeFakeUserData());
  });

  it('should update the state after successful login action', () => {
    expect(user.reducer(initialState, {type: loginAction.fulfilled, payload: makeFakeUserData()}))
      .toEqual(makeFakeUserData());
  });

  it('should add the movie to myList if it is not yet in it', () => {
    expect(user.reducer(initialState, {type: postToggleMyListMovie.fulfilled, payload: {...makeFakeMovie(), isFavorite: true}}))
      .toEqual({...initialState, myList: [{...makeFakeMovie(), isFavorite: true}]});
  });
});
