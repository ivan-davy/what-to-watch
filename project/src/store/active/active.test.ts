import {active, initialState} from './active';
import {fetchActiveDataAction, postToggleMyListMovie, postUserReviewAction} from '../api-actions';
import {makeFakeActiveData, makeFakeMovie, makeFakeReviews} from '../../mocks/mocks';

describe('Reducer: active', () => {
  it('without additional parameters should return initial state', () => {
    expect(active.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should update the state after a successful fetch', () => {
    expect(active.reducer(initialState, {type: fetchActiveDataAction.fulfilled.type, payload: makeFakeActiveData()}))
      .toEqual(makeFakeActiveData());
  });

  it('should update the reviews after a successful review post', () => {
    expect(active.reducer(initialState, {type: postUserReviewAction.fulfilled.type, payload: makeFakeReviews()}))
      .toEqual({...initialState, reviews: makeFakeReviews()});
  });

  it('should update active movie\'s isFavorite value only in case it was the one added/removed from myList', () => {
    expect(active.reducer(initialState, {type: postToggleMyListMovie.fulfilled.type, payload: makeFakeMovie()}))
      .toEqual(initialState);
  });
});
